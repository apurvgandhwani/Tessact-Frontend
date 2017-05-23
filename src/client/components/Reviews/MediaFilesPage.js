/**
 * Created by root on 5/16/17.
 */
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
    Table, TableBody, TableHeader, TableFooter,
    TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';


const styles = {
    height: "100%",
    footerContent: {
        float: 'left'
    },
    footerText: {
        float: 'left',
        paddingTop: '16px',
        height: '16px'
    }
};

class MediaFilesPage extends Component {
    static propTypes = {
        //items: PropTypes.array.isRequired,
        selectedRows: PropTypes.array.isRequired,
        authToken: PropTypes.string.isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    }


    state = {
        MediaFiles: [],
        fileURLS:[],
        previous: null,
        next: null
        
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
        var URL_array = [];
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/videos/?page=1",
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function( response, textStatus, jQxhr ){
                response.results.map((item,i) => {
                    URL_array.push(item.url)
                    //that.setState({fileURLS:that.state.fileURLS.push(item.url)})
                })
            },
        }

        $.ajax(settings).done((response) => {
            //alert("yo");
            that.setState({
                MediaFiles: response.results,
                fileURLS:URL_array,
                previous: response.previous,
                next: response.next
            })
            this.props.fetchMediaFilePageUrls(that.state.fileURLS);
            console.log(that.state.MediaFiles)
            console.log(that.state.next + " and " + that.state.previous)
            //console.log(that.state.fileURLS)
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
        var finalHeight = $(window).height() - bounds.top - 40;

        $(tableDiv).css('height', finalHeight + 'px')
        console.log('tableheight: ', finalHeight)
    }

    onRowChecked(row){
        console.log(row)
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

    getPreviousPage(){
        console.log("previous")
        var that = this;
        var URL_array = [];
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": that.state.previous,
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function( response, textStatus, jQxhr ){
                response.results.map((item,i) => {
                    URL_array.push(item.url)
                    //that.setState({fileURLS:that.state.fileURLS.push(item.url)})
                })
            },
        }

        if(that.state.previous != null) {
            $.ajax(settings).done((response) => {
                //alert("yo");
                that.setState({
                    MediaFiles: response.results,
                    fileURLS: URL_array,
                    previous: response.previous,
                    next: response.next
                })
                this.props.fetchMediaFilePageUrls(that.state.fileURLS);
                console.log(that.state.MediaFiles)
                //console.log(that.state.fileURLS)
                console.log('check');
            });
        }
        else {
            alert("nothing previous to show")
        }
    }

    getNextPage(){
        var that = this;
        var URL_array = [];
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": that.state.next,
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function( response, textStatus, jQxhr ){
                response.results.map((item,i) => {
                    URL_array.push(item.url)
                    //that.setState({fileURLS:that.state.fileURLS.push(item.url)})
                })
            },
        }

        if(that.state.next != null) {
            $.ajax(settings).done((response) => {
                //alert("yo");
                that.setState({
                    MediaFiles: response.results,
                    fileURLS: URL_array,
                    previous: response.previous,
                    next: response.next

                })
                this.props.fetchMediaFilePageUrls(that.state.fileURLS);
                console.log(that.state.MediaFiles)
                //console.log(that.state.fileURLS)
                console.log('check');
            });
        }
        else{
            window.alert("no more content available")
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
                onCheck={this.onRowChecked}
                onRowSelection={this.props.onRowSelection}>
         >
                <TableHeader
                    className='table-header'
                    style={{fontFamily: 'montserratregular'}}
                    adjustForCheckbox={true}>
                    <TableRow className='table-header-row' style={{height:'10'}}>
                        <TableHeaderColumn className='th-filename'> Filename </TableHeaderColumn>
                        <TableHeaderColumn> Channel </TableHeaderColumn>
                        <TableHeaderColumn> File Type </TableHeaderColumn>

                    </TableRow>
                </TableHeader>
                <TableBody
                    onCheck={this.onRowChecked}
                    showRowHover={true}
                    style={styles.height}
                    deselectOnClickaway={false}>
                    {
                        this.state.MediaFiles.map((item,i)=> (
                            <TableRow
                                key={i}
                                className={`table-item-${i}`}
                                selected={this.props.selectedRows.includes(i)}>
                                <TableRowColumn className='td-filename'>
                                    <div className='item-file-details'>
                                        <div className='file-image' style={{backgroundImage: `url('${item.poster.list_thumbnail}')`}}/>
                                        <div className='details'>
                                            <p className='detail-name'> {item.title} </p>

                                        </div>
                                    </div>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <p className="file-channel">Zee</p>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <p className="file-duration">Movie </p>
                                </TableRowColumn>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter adjustForCheckbox={false}>
                    <TableRow>
                        <TableRowColumn style={styles.footerContent}>
                            <IconButton onClick={() => this.getPreviousPage()} >
                                <ChevronLeft/>
                            </IconButton>
                            <IconButton onClick={() => this.getNextPage()}>
                                <ChevronRight/>
                            </IconButton>
                        </TableRowColumn>
                        <TableRowColumn style={styles.footerText} />
                    </TableRow>
                </TableFooter>
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

export default connect(mapStateToProps, matchDispatchToProps)(MediaFilesPage);