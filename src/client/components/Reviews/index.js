import Promise from 'bluebird'
import {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Reviews.styl'
import $ from 'jquery'
import _ from 'lodash'

import MediaFilesPage from './MediaFilesPage'
import ReviewSearch from './ReviewSearch'
import ReviewTable from './ReviewTable'
import JobsTable from './JobsTable'
import {actions} from 'store/Data'
import AddFileButton from './AddFileButton'
import {searchOptionChangedAction} from '../../store/searchOptionChangedAction'

var MediaFilesView;

class Reviews extends Component {
	state = {
		items: [],
		assignIsOpen: false,
		fileUploadIsOpen:false,
		mediaFilesUrls:[],
		checkedFilesArray:[]
	};

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

    componentWillMount(){
        this.props.search_option_changed_reducer.index =1 ;
		console.log(this.props.search_option_changed_reducer.index)
	}
	onRowSelection = (selected)=> {
		console.log('Selected rows: ', selected)
		this.setState({checkedFilesArray:selected})
		this.props.selectRows(selected)
	}

	fetchMediaFilePageUrls(filesURLS){
    	this.setState({mediaFilesUrls:filesURLS})
		console.log(this.state.mediaFilesUrls)
	}

	onSubmitProcess = ()=> {
		this.props.selectedRows.forEach(rowIndex => {
			var $row = $('.table-item-' + rowIndex);
			var $process = $row.find('.process-column')

			// If already processed return
			if (!$process.empty()){
				return
			}

			this.createProcessAnimation($process);

		})
		console.log('Process submitted')
	}

	createProcessAnimation = ($el)=> {
		var $progress = $('<div/>', {class: 'ui-progress-bar'});
		var $bar = $('<div/>', {class: 'ui-bar'});
		$bar.css('width', '0%');
		$progress.append($bar)

		$el.append($progress);
		$bar.stop().animate({width: '100%'}, 4000, function(){
			$el.empty().html('<img class="img-green-tick" src="/public/img/green-check.png"/>')
		});
	}

	processFiles(){
        var resultArr = _.at(this.state.mediaFilesUrls, this.state.checkedFilesArray)
		console.log(resultArr)

        var that = this;
        for(var i=0;i<resultArr.length;i++) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": resultArr[i] + 'process_for_compliance/',
                "method": "GET",
                "headers": {
                    Authorization: "Token " + that.props.token_Reducer.token
                },
                success: function (response, textStatus, jQxhr) {
                },
            }

            $.ajax(settings).done((response) => {
                //alert("yo");
                console.log("compliance for " + i + "done")
            });
        }

    }

	toggleAssign = ()=> {
		this.setState({
			assignIsOpen: !this.state.assignIsOpen
		})
	}

    openFileUpload(){
        this.setState({
            fileUploadIsOpen: !this.state.fileUploadIsOpen
        })
    }


    setCurrentItem = (item)=> {
        this.props.setCurrentItem(item);
        this.context.router.push('/new-video-page')
        //this.context.router.push('/tagging-video-page')
        //this.context.router.push('/video-screen')
    }

    toGroups = () => {
        this.context.router.push('/groups')
	}


	render(){

		MediaFilesView;

        if(this.props.search_option_changed_reducer.index == 1){
            MediaFilesView = <ReviewTable
				//items={this.props.list}
				selectedRows={this.props.selectedRows}
				authToken={this.props.auth_token}
				onRowSelection={this.onRowSelection}
				setCurrentItem={this.setCurrentItem}/>
		}

        if(this.props.search_option_changed_reducer.index == 2){
            MediaFilesView = <JobsTable
				//items={this.props.list}
				selectedRows={this.props.selectedRows}
				authToken={this.props.auth_token}
				onRowSelection={this.onRowSelection}
				setCurrentItem={this.setCurrentItem}/>
        }

        if(this.props.search_option_changed_reducer.index == 3){
            MediaFilesView = <MediaFilesPage
				//items={this.props.list}
				selectedRows={this.props.selectedRows}
				authToken={this.props.auth_token}
				onRowSelection={this.onRowSelection.bind(this)}
				fetchMediaFilePageUrls={this.fetchMediaFilePageUrls.bind(this)}
				setCurrentItem={this.setCurrentItem}/>
        }



		return (
			<div className={c.container}>
				<ReviewSearch
					assignIsOpen={this.state.assignIsOpen}
					toggleAssign={this.toggleAssign}
					selectedRows={this.props.selectedRows}
					onSubmitProcess={this.onSubmitProcess}
				    toGroups={this.toGroups}
					processFiles={this.processFiles.bind(this)}
					searchIndex={this.props.search_option_changed_reducer}
				/>
				{MediaFilesView}
				<AddFileButton
					openFileUpload={this.openFileUpload.bind(this)}
					fileUploadIsOpen={this.state.fileUploadIsOpen}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state)=> ({
	//list: state.Data.list,
	selectedRows: state.Data.selectedRows,
	auth_token: state.Data.auth_token,
    token_Reducer: state.tokenReducer,
	search_option_changed_reducer: state.searchOptionChangedReducer
})

const mapDispatchToProps = (dispatch)=> ({
	selectRows(ids){
		return dispatch(actions.selectRows(ids))
	},
	setCurrentItem(item){
		return dispatch(actions.setCurrentItem(item))
	},
    setAuthToken(item){
        return dispatch(actions.setCurrentItem(item))
    }
})


export default withStyles(c)(
	connect(mapStateToProps,mapDispatchToProps)(Reviews)
)