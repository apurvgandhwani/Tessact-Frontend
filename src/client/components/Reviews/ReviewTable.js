import {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import {browserHistory} from 'react-router'
import throttle from 'lodash/throttle'
import $ from 'jquery'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {videoFileSelectedAction} from '../../store/VideoFileSelectedAction'
import {MediaFilesChangeAction} from '../../store/MediaFilesChangeAction'
import {
	Table, TableBody, TableHeader, 
	TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';


class ReviewTable extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		selectedRows: PropTypes.array.isRequired,
		authToken: PropTypes.string.isRequired
	};

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

    state = {
        MediaFiles: []
    };
	componentDidMount = ()=> {
		this._fixTableHeight = throttle(()=> {
			this.fixTableHeight()
		}, 1000);
		$(window).on('resize', this._fixTableHeight);
		this.fixTableHeight()
	}

    componentWillMount = ()=> {
        var that = this;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com//api/v1/workgroups/",
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function( response, textStatus, jQxhr ){
                var settings_second = {
                    "async": true,
                    "crossDomain": true,
                    "url":  response.results[0].url + "tagging_jobs/",
                    "method": "GET",
                    "headers": {
                        Authorization: "Token " + that.props.token_Reducer.token
                    },
                    success: function( data, textStatus, jQxhr ){
                        //that.setState({MediaFiles: data})
						that.props.MediaFilesChangeAction(data, response.results[0].url + "tagging_jobs/")
                        //console.log(that.state.MediaFiles)
                    },
                }
                $.ajax(settings_second).done((response) => {
                    //alert("yo");


                });
            },
        }

        var listSettings = {

            "async": true,
            "crossDomain": true,
            "url": "https://trigger-backend.appspot.com/api/v1/workgroups/279ba660-90e9-4507-aa74-3407f7f9405a/tagging_jobs",
            "method": "GET",
            "headers": {
                Authorization: that.props.token_Reducer.token
            },
            success: function( data, textStatus, jQxhr ){
               // alert("success");

            },
        }

        $.ajax(settings).done((response) => {
            //alert("yo");
            console.log('check');
        });

        // $.ajax(listSettings).done((response) => {
        //     alert("yo");
        //     console.log('check');
        //     // this.context.router.push('/app')
        // });
        //
    }

	componentWillUnmount = ()=> {
		$(window).off('resize', this._fixTableHeight)


	}

	fixTableHeight = ()=> {
		var tableDiv = findDOMNode(this.table_el.refs.tableDiv);
		var bounds = tableDiv.getBoundingClientRect();
		var finalHeight = $(window).height() - bounds.top;

		$(tableDiv).css('height', finalHeight + 'px')
		console.log('tableheight: ', finalHeight)
	}

	getStatusClassName = (status)=> {
		var c = 'td-status';
		var s = status.toLowerCase();

		if (s === 'completed')
			c += ' td-green'
		if (s === 'not done')
			c += ' td-yellow'
		if (s === 'ongoing')
			c += ' td-orange'
		return c
	}

	// showVideo = (index)=> {
	// 	return (e)=> {
	// 		console.log('showing...', index)
	// 		this.props.setCurrentItem(
	// 			this.props.items[index]
	// 		)
	// 	}
	// }

    showVideo = (url , video_id, video_name, video_duration)=> {
        return (e)=> {
            //console.log('showing...', index)
			this.props.videoFileSelectedAction(url, video_id, video_name, video_duration)
            this.props.setCurrentItem(
                url
            )
        }
    }

    secondsToHms =(d) =>{
    d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "00" : "") : "00:") + "0"+ m + ":" + (s < 10 ? "0" : "") + s); }

    jobStatus=(job_status)=>{
		switch(job_status){
			case "APR":
				return "Approved"
			case "NPR":
				return "Not Processed"
			default:
				return ""
		}
	}

    render(){
        return (
			<Table
				height='600px'
				ref={(el)=> this.table_el = el }
				fixedHeader={true}
				multiSelectable={true}
				onRowSelection={this.props.onRowSelection}>
				<TableHeader
					className='table-header'
					style={{fontFamily: 'montserratregular'}}
					adjustForCheckbox={true}>
					<TableRow>
						<TableHeaderColumn  className='th-filename'> Filename </TableHeaderColumn>
						<TableHeaderColumn> Channel </TableHeaderColumn>
						<TableHeaderColumn> Duration </TableHeaderColumn>
						<TableHeaderColumn> Uploaded </TableHeaderColumn>
						<TableHeaderColumn> TX Date </TableHeaderColumn>
						<TableHeaderColumn> Process </TableHeaderColumn>
						<TableHeaderColumn> Assigned </TableHeaderColumn>
						<TableHeaderColumn> Status </TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody
					showRowHover={true}
					deselectOnClickaway={false}>
                    {
                        this.props.media_file_store.MediaFiles.map((item,i)=> (
							<TableRow
								key={i}
								className={`table-item-${i}`}
								selected={this.props.selectedRows.includes(i)}>
								<TableRowColumn className='td-filename' onMouseUp={this.showVideo(item.video.file, item.video.id, item.video.title, item.video.duration)}>
									<div className='item-file-details'>
										<div className='file-image' style={{backgroundImage: `url('${item.video.poster.list_thumbnail}')`}}/>
										<div className='details'>
											<p className='detail-name'> {item.video.title} </p>
											<p className='detail-type'> Movie </p>
										</div>
									</div>
								</TableRowColumn>
								<TableRowColumn>
									<p className="file-channel">Zee</p>
								</TableRowColumn>
								<TableRowColumn>
									<p className="file-duration">{this.secondsToHms(item.video.duration)} </p>
								</TableRowColumn>
								<TableRowColumn>
									<p className="file-upload-date">{item.video.created_on}</p>
								</TableRowColumn>
								<TableRowColumn>
									<p className="file-tx-date">20-02-17</p>
								</TableRowColumn>
								<TableRowColumn className='process-column'>  </TableRowColumn>
								<TableRowColumn>
									<p className="file-assignee">Apurv</p>
								</TableRowColumn>
								<TableRowColumn
									className={this.getStatusClassName(item.job_status)}>
                                    {this.jobStatus(item.job_status)}
								</TableRowColumn>
							</TableRow>
                        ))
                    }
				</TableBody>
			</Table>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        token_Reducer: state.tokenReducer,
		media_file_store:state.MediaFileStore


    };
};
//
function matchDispatchToProps(dispatch) {
    return bindActionCreators({videoFileSelectedAction: videoFileSelectedAction, MediaFilesChangeAction:MediaFilesChangeAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ReviewTable);