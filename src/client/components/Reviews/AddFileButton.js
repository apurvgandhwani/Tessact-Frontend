import {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import $ from 'jquery'
const styles = {
    button: {
        backgroundColor: '#d6d6d6',
        margin:"2px",
        color:'#4b4b4b'
    }
}

var maxBlockSize;
var numberOfBlocks = 1;
var selectedFile = null;
var currentFilePointer = 0;
var totalBytesRemaining = 0;
var blockIds = new Array();
var blockIdPrefix = "block-";
var submitUri = null;
var bytesUploaded = 0;
var files;
var reader = new FileReader();
import {connect} from 'react-redux'



class AddButton extends Component {

    handleFileSelect(e) {

        var that = this
        maxBlockSize = 10000 * 1024;
        currentFilePointer = 0;
        totalBytesRemaining = 0;
        files = e.target.files;
        selectedFile = files[0];
        console.log(selectedFile.name)
        console.log(selectedFile.size)
        console.log(selectedFile.type)
        var fileSize = selectedFile.size;
        if (fileSize < maxBlockSize) {
            maxBlockSize = fileSize;
            console.log("max block size = " + maxBlockSize);
        }
        totalBytesRemaining = fileSize;
        if (fileSize % maxBlockSize == 0) {
            numberOfBlocks = fileSize / maxBlockSize;
        } else {
            numberOfBlocks = parseInt(fileSize / maxBlockSize, 10) + 1;
        }
        console.log("total blocks = " + numberOfBlocks);
        // $("#fileName").text(selectedFile.name);
        // $("#fileSize").text(selectedFile.size);
        // $("#fileType").text(selectedFile.type);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/videos/get_video_url/",
            "method": "GET",
            "credentials": 'include',
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success:( response, textStatus, jQxhr )=> {
               console.log(response.blob_url)
            }
        }

        $.ajax(settings).done((response) => {
            //alert(response.auth_token);
            //token = response.auth_token
            //that.props.setAuthToken(token);
            //console.log(token);
            //console.log("hello" + 126.4567 % 3600 % 60);
            //window.localStorage.token_auth = token;
            //this.context.router.push('/app')
            var baseUrl = response.blob_url + '?' + response.token;
            submitUri = baseUrl
            this.uploadFileInBlocks();
            //console.log(response.blob_url + '?' + response.token)
        });

       // var baseUrl = 'https://triggerbackendnormal.blob.core.windows.net/backend-media/e7581d7b-a59d-47eb-b8aa-6b6799179b36.mp4?sv=2016-05-31&sr=b&se=2017-05-09T18%3A26%3A07Z&sp=w&sig=TlS/a9RgVT/j7BHztjFZSF2L21za48J7sknoAre3Sko%3D'
       // submitUri = baseUrl
        //console.log(submitUri);



    }


    loadEnd(evt){
        var that = this;
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            var uri = submitUri + '&comp=block&blockid=' + blockIds[blockIds.length - 1];
            var requestData = new Uint8Array(evt.target.result);
            $.ajax({
                url: uri,
                type: "PUT",
                data: requestData,
                processData: false,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
                    // xhr.setRequestHeader('Content-Length', requestData.length);
                },
                success: function (data, status) {
                    console.log(data);
                    console.log("hi" + status);
                    bytesUploaded += requestData.length;
                    var percentComplete = ((parseFloat(bytesUploaded) / parseFloat(selectedFile.size)) * 100).toFixed(2);
                    console.log(percentComplete)
                    that.uploadFileInBlocks();
                },
                error: function(xhr, desc, err) {
                    console.log(desc);
                    console.log(err);
                }
            });
        }
    }

    uploadFileInBlocks() {
        if (totalBytesRemaining > 0) {
            console.log("current file pointer = " + currentFilePointer + " bytes read = " + maxBlockSize);
            var fileContent = selectedFile.slice(currentFilePointer, currentFilePointer + maxBlockSize);
            var blockId = blockIdPrefix + this.pad(blockIds.length, 6);
            console.log("block id = " + blockId);
            blockIds.push(btoa(blockId));
            reader.readAsArrayBuffer(fileContent);
            reader.onloadend = this.loadEnd.bind(this);
            currentFilePointer += maxBlockSize;
            totalBytesRemaining -= maxBlockSize;
            if (totalBytesRemaining < maxBlockSize) {
                maxBlockSize = totalBytesRemaining;
            }
        } else {
            this.commitBlockList();
        }
    }

    commitBlockList() {
        var uri = submitUri + '&comp=blocklist';
        console.log(uri);
        var requestBody = '<?xml version="1.0" encoding="utf-8"?><BlockList>';
        for (var i = 0; i < blockIds.length; i++) {
            requestBody += '<Latest>' + blockIds[i] + '</Latest>';
        }
        requestBody += '</BlockList>';
        console.log(requestBody);
        $.ajax({
            url: uri,
            type: "PUT",
            data: requestBody,
            beforeSend: function (xhr) {
                //xhr.setRequestHeader('x-ms-blob-content-type', selectedFile.type);
                //xhr.setRequestHeader('Content-Length', requestBody.length);
            },
            success: function (data, status) {
                console.log(data);
                console.log("hi" + status);
            },
            error: function (xhr, desc, err) {
                console.log(desc);
                console.log(err);
            }
        });

    }
    pad(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    render(){
        return (
            <label htmlFor='myInput'>
                <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{visibility: 'hidden'}} onChange={this.handleFileSelect.bind(this)}/>
                <FloatingActionButton
                    className="floatingButton"
                    backgroundColor='#fb802a'
                    onClick={(e) => this.upload.click() }>
                    <ContentAdd />
                </FloatingActionButton>
            </label>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        token_Reducer: state.tokenReducer,
        media_file_store:state.MediaFileStore
    };
};

export default connect(mapStateToProps)(AddButton);