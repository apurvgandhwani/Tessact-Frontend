import {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Select from 'react-select'
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
var selectedFile = {name:"select a file"};
var selectedPoster = {name:"select poster"};
var currentFilePointer = 0;
var totalBytesRemaining = 0;
var blockIds = new Array();
var blockIdPrefix = "block-";
var submitUri = null;
var bytesUploaded = 0;
var fileSize = 0;
var files, posterFile;
var reader = new FileReader();
import {connect} from 'react-redux'
var fileIndex = 0;
var imageURL;
var folder;
var numberOfFiles;
class AddButton extends Component {


    doUpload = () => {
        this.handleUpload(0);
    }

    doCancel = () => {
        this.props.openFileUpload();

    }


    sendURL(){
        var blobPosterFile = selectedPoster;
        console.log("U called me?")
        var formData = new FormData();
        formData.append("file", imageURL)

        var that = this;
        let token;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/frames/",
            "type": "POST",
            processData: false,
            contentType: false,
            "credentials": 'include',
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            "data": formData,

            success:( response, textStatus, jQxhr )=> {
                //this.props.tokenAction(response.auth_token);
                console.log("urlsent")
            }
        }

        $.ajax(settings).done((response) => {
            //that.handleUpload(fileIndex);
            // token = response.auth_token

            // //that.props.setAuthToken(token);
            // console.log(token);
            // console.log("hello" + 126.4567 % 3600 % 60);
            // window.localStorage.token_auth = token;
            // this.context.router.push('/app')
        });
    }

    handleUpload(i){

        numberOfBlocks = 1;
        //currentFilePointer = 0;
        //totalBytesRemaining = 0;
       // blockIds = new Array();


        var that = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/frames/get_frame_url/",
            "method": "GET",
            "credentials": 'include',
            "headers": {
                Authorization: "Token " + this.props.token_Reducer.token
            },
            success:( response, textStatus, jQxhr )=> {
                console.log(response)
                selectedFile = files[i];
                fileSize = selectedFile.size;
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
            imageURL = response.blob_url;
            console.log(response.blob_url + '?' + response.token)

            if (fileIndex == 0){
                that.props.openFileUpload();
            }
            that.uploadImage();

        });




    }

    handleFileSelect(e){
        maxBlockSize = 1000 * 1024;
        currentFilePointer = 0;
        totalBytesRemaining = 0;
        files = e.target.files;
        //console.log(files[0])
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
                    console.log("percentage complete " + percentComplete)
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
    uploadImage() {
        var that = this;
        var uri = submitUri
        console.log(uri);
        var requestBody = '<?xml version="1.0" encoding="utf-8"?><BlockList>';
        $.ajax({
            url: uri,
            processData:false,
            type: "PUT",
            data: selectedFile,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
                //xhr.setRequestHeader('x-ms-blob-content-type', selectedFile.type);
                //xhr.setRequestHeader('Content-Length', requestBody.length);
            },
            success: function (data, status) {
                console.log(data);
                console.log("hi " + files[fileIndex].name + " uploaded");

                blockIds = new Array();

                fileIndex = fileIndex + 1;
                if(fileIndex==files.length){
                    console.log("all images uploaded")
                    that.sendURL();

                }
                else {
                    that.sendURL();
                    that.handleUpload(fileIndex);
                }


            },
            error: function (xhr, desc, err) {
                console.log(desc);
                console.log(err);
            }
        });
    }

    commitBlockList() {
        var that = this;
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
                console.log("hi " + files[fileIndex].name + " uploaded");

                blockIds = new Array();

                fileIndex = fileIndex + 1;
                if(i==files.length){
                    console.log("all images uploaded")
                }
                else {
                    that.sendURL();

                }


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
            <div>
            <label htmlFor='myInput'>
                <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{visibility: 'hidden'}} multiple="multiple"/>
                <FloatingActionButton
                    className="floatingButton"
                    backgroundColor='#5199f6'
                    //onClick={(e) => this.upload.click() }
                    onClick= {this.props.openFileUpload}>
                    <ContentAdd />
                </FloatingActionButton>

            </label>
                {
                    this.props.fileUploadIsOpen
                    && <div className='assign-dialog'>
                        <div className='assign-dialog-inner'>
                            <div className='dia-title'> File Upload</div>
                            <div className='dia-body'>
                                <div className='control-container'>
                                    <div className='control-label'> Video File</div>
                                    <div className='control-browse'>
                                        <input type="text" className="form-control" id="fileName" value={selectedFile.name} readOnly/>
                                        <button type="button" className="btn btn-primary" style={{backgroundColor:'#5199f6', borderColor:'#5199f6'}} onClick={(e) => this.upload_file.click()}>Browse</button>
                                        <input id="myInput" type="file" ref={(ref) => this.upload_file = ref} style={{visibility: 'hidden', width:0}} onChange={this.handleFileSelect.bind(this)} multiple/>
                                    </div>
                                </div>
                            </div>
                            <div className='dia-footer'>
                                <FlatButton label='Cancel'
                                            style={{color: '#F55A36'}}
                                            onClick={this.doCancel}/>
                                <FlatButton label='Upload'
                                            style={{color: '#F55A36'}}
                                            onClick={this.doUpload}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
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