import
{Component, PropTypes} from 'react'
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
		//items: PropTypes.array.isRequired,
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
            "url": "https://www.backend.trigger.tessact.com/api/v1/auto_video_jobs/",
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function( response, textStatus, jQxhr ){
               that.setState({MediaFiles:response.results})
				console.log(that.state.MediaFiles)
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

    showVideo = (url , video_id, video_name, video_duration, video_height, video_width, frame_rate)=> {
        return (e)=> {
            //console.log('showing...', index)
			this.props.videoFileSelectedAction(url, video_id, video_name, video_duration, video_height, video_width, frame_rate)
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
            case "PRD":
                return "Processed"
			default:
				return ""
		}
	}

	cellChecked(x, y, z){
		console.log(z)
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
					<TableRow className='table-header-row' style={{height:'10'}}>
						<TableHeaderColumn  className='th-filename'> Filename </TableHeaderColumn>
						<TableHeaderColumn> Channel </TableHeaderColumn>
						<TableHeaderColumn> File Type </TableHeaderColumn>
						<TableHeaderColumn> Uploaded </TableHeaderColumn>
						<TableHeaderColumn> Process </TableHeaderColumn>
						<TableHeaderColumn> Status </TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody
					showRowHover={true}
					deselectOnClickaway={false}>
                    {
                        this.state.MediaFiles.map((item,i)=> (
							<TableRow
								key={i}
								className={`table-item-${i}`}
								selected={this.props.selectedRows.includes(i)}>
								<TableRowColumn className='td-filename' onMouseUp={this.showVideo(item.video.file, item.video.id, item.video.title, item.video.duration, item.video.height, item.video.width, item.video.frame_rate)}>
									<div className='item-file-details'>
										<div className='file-image' style={{backgroundImage: `url('${item.video.poster.list_thumbnail}')`}}/>
										<div className='details'>
											<p className='detail-name'> {item.video.title} </p>
											<p className='detail-type'>{this.secondsToHms(item.video.duration)}  </p>
										</div>
									</div>
								</TableRowColumn>
								<TableRowColumn>
									<p className="file-channel">Zee</p>
								</TableRowColumn>
								<TableRowColumn>
									<p className="file-duration">Movie </p>
								</TableRowColumn>
								<TableRowColumn>
									<p className="file-upload-date">{item.video.created_on}</p>
								</TableRowColumn>
								<TableRowColumn>
									<p className='process-column'>{item.job_type}</p>
								</TableRowColumn>
								<TableRowColumn>
									<p className={this.getStatusClassName(item.job_status)}>
                                    {this.jobStatus(item.job_status)}
									</p>
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