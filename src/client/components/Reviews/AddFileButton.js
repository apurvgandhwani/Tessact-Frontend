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

var videoURL;

class AddButton extends Component {


    doUpload = () => {
        var that = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/videos/get_video_url/",
            "method": "GET",
            "credentials": 'include',
            "headers": {
                Authorization: "Token " + this.props.token_Reducer.token
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
            videoURL = response.blob_url;
            this.uploadFileInBlocks();
            this.props.openFileUpload();
            //console.log(response.blob_url + '?' + response.token)
        });

    }

    doCancel = () => {
        this.props.openFileUpload();

    }
    handleFileSelect(e) {
        maxBlockSize = 3500 * 1024;
        currentFilePointer = 0;
        totalBytesRemaining = 0;
        files = e.target.files;
        selectedFile = files[0];
        console.log(selectedFile.name)
        console.log(selectedFile.size)
        console.log(selectedFile.type)
        fileSize = selectedFile.size;
        if (fileSize < maxBlockSize) {
            maxBlockSize = fileSize;
            console.log("max block size = " + maxBlockSize);
        }
        $('#fileName').val(selectedFile.name)

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

        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://www.backend.trigger.tessact.com/api/v1/videos/get_video_url/",
        //     "method": "GET",
        //     "credentials": 'include',
        //     "headers": {
        //         Authorization: "Token " + that.props.token_Reducer.token
        //     },
        //     success:( response, textStatus, jQxhr )=> {
        //        console.log(response.blob_url)
        //     }
        // }
        //
        // $.ajax(settings).done((response) => {
        //     //alert(response.auth_token);
        //     //token = response.auth_token
        //     //that.props.setAuthToken(token);
        //     //console.log(token);
        //     //console.log("hello" + 126.4567 % 3600 % 60);
        //     //window.localStorage.token_auth = token;
        //     //this.context.router.push('/app')
        //     var baseUrl = response.blob_url + '?' + response.token;
        //     submitUri = baseUrl
        //     this.uploadFileInBlocks();
        //     //console.log(response.blob_url + '?' + response.token)
        // });

       // var baseUrl = 'https://triggerbackendnormal.blob.core.windows.net/backend-media/e7581d7b-a59d-47eb-b8aa-6b6799179b36.mp4?sv=2016-05-31&sr=b&se=2017-05-09T18%3A26%3A07Z&sp=w&sig=TlS/a9RgVT/j7BHztjFZSF2L21za48J7sknoAre3Sko%3D'
       // submitUri = baseUrl
        //console.log(submitUri);
    }

    handlePosterSelect(e) {
        //maxBlockSize = 1000 * 1024;
        //currentFilePointer = 0;
        //totalBytesRemaining = 0;
        posterFile = e.target.files;
        selectedPoster = posterFile[0];
        console.log(selectedPoster.name)
        console.log(selectedPoster.size)
        console.log(selectedPoster.type)
        //fileSize = selectedPoster.size;
        // if (fileSize < maxBlockSize) {
        //     maxBlockSize = fileSize;
        //     console.log("max block size = " + maxBlockSize);
        // }
        $('#posterName').val(selectedPoster.name)
        //totalBytesRemaining = fileSize;
        //if (fileSize % maxBlockSize == 0) {
           // numberOfBlocks = fileSize / maxBlockSize;
      //  } else {
         //   numberOfBlocks = parseInt(fileSize / maxBlockSize, 10) + 1;
      //  }
      //  console.log("total blocks = " + numberOfBlocks);
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
                console.log("hi" + status);
                blockIds = new Array();
                that.uploadPoster();

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

    uploadPoster() {
        var blobPosterFile = selectedPoster;
        console.log("U called me?")
        var formData = new FormData();
        formData.append("file", videoURL)
        formData.append("poster", blobPosterFile);
        formData.append("title", selectedFile.name)

        var that = this;
        let token;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/videos/",
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
                console.log("poster uploaded")
            }
        }

        $.ajax(settings).done((response) => {
            // alert(response.auth_token);
            // token = response.auth_token
            // //that.props.setAuthToken(token);
            // console.log(token);
            // console.log("hello" + 126.4567 % 3600 % 60);
            // window.localStorage.token_auth = token;
            // this.context.router.push('/app')
        });
    }
    render(){
        return (
            <div>
            <label htmlFor='myInput'>
                <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{visibility: 'hidden'}} />
                <FloatingActionButton
                    className="floatingButton"
                    backgroundColor='#fb802a'
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
                                        <button type="button" className="btn btn-primary" style={{backgroundColor:"#fe8012", borderColor:"#fe8012"}} onClick={(e) => this.upload_file.click()}>Browse</button>
                                        <input id="myInput" type="file" ref={(ref) => this.upload_file = ref} style={{visibility: 'hidden', width:0}} onChange={this.handleFileSelect.bind(this)}/>
                                    </div>
                                </div>
                                <div className='control-container'>
                                    <div className='control-label'> Poster</div>
                                    <div className='control-browse'>
                                        <input type="text" className="form-control" id="posterName" value={selectedPoster.name} readOnly/>
                                        <button type="button" className="btn btn-primary" style={{backgroundColor:"#fe8012", borderColor:"#fe8012"}} onClick={(e) => this.upload.click() }>Browse</button>
                                        <input id="posterImage" type="file" ref={(ref) => this.upload = ref} style={{visibility: 'hidden', width:0}} onChange={this.handlePosterSelect.bind(this)} accept="image/*"/>
                                    </div>
                                </div>
                                <div className='control-container'>
                                    <div className='control-label'> Type</div>
                                    <div className='control'>
                                        <Select
                                            name='assign-user'
                                            clearable={false}
                                            //value={this.state.selectedUser}
                                            //onChange={this.updateAssigned}
                                            //options={this.state.assignOptions}
                                        />
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