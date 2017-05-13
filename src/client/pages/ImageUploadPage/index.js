import _ from 'lodash'
import {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import AddIcon from 'material-ui/svg-icons/content/add'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Reviews.styl'
import FlatButton from 'material-ui/FlatButton'
import $ from 'jquery'
import {ORANGE} from 'utils/colors'



import {actions as groupActions} from 'store/Groups'

const debug = require('debug')('tessact:pages:groups')

var groupList = [];



const styles = {
    button: {
        backgroundColor: ORANGE,
        height: '50px',
        width: '300px',
        color: '#fff',
        width: '100%'
    }
}

var selectedFile = {name: "select a folder"}
class ImageUploadPage extends Component {

	componentWillMount(){

		var that = this;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/workgroups/",     //put url to get group list from here
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function( response, textStatus, jQxhr ){

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://www.backend.trigger.tessact.com/api/v1/workgroups/"+ response.results[0].id + "/members/",     //put url to get group list from here
                    "method": "GET",
                    "headers": {
                        Authorization: "Token " + that.props.token_Reducer.token
                    },
                    success: function( response, textStatus, jQxhr ){

                    },
                }

                $.ajax(settings).done((response) => {

                    //alert("yo");

                    console.log(response[0].username);
                });
            },
        }

        $.ajax(settings).done((response) => {

        	groupList = response.results;
            //alert("yo");
            //console.log(response.results[0].name);
        });

    }


    state = {
        fileUploadIsOpen:false
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    }


    openFileUpload(){
        console.log("called")
        this.setState({
            fileUploadIsOpen: true
        })
    }

    doCancel(){
        this.setState({
            fileUploadIsOpen: !this.state.fileUploadIsOpen
        })
    }

    doUpload(){
        this.setState({
            fileUploadIsOpen: !this.state.fileUploadIsOpen
        })
    }
	render(){
		const {
			list, isLoading, hasError,
			selectedId
		} = this.props;

		const {
			mode 
		} = this.state;



		const cx = classnames(c.container)

		return (
			<div className={c.container}>
				<FlatButton
					icon={<AddIcon color='#fff'/>}
					label='Add Image Folder'
                    onClick = {this.openFileUpload.bind(this)}
					style={styles.button}/>

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
                            </div>
                            <div className='dia-footer'>
                                <FlatButton label='Cancel'
                                            style={{color: '#F55A36'}}
                                            onClick={this.doCancel.bind(this)}/>
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

const mapStateToProps = (state)=> ({
    token_Reducer: state.tokenReducer,
	list: state.Groups.list,
	isLoading: state.Groups.isLoading,
	hasError: state.Groups.hasError,
	selectedId: state.Groups.selectedId
})

const mapDispatchToProps = (dispatch)=> ({
	selectGroup(id){
		return dispatch(groupActions.selectGroup(id))
	}
})

export default withStyles(c)(
	connect(mapStateToProps, mapDispatchToProps)(ImageUploadPage)
)