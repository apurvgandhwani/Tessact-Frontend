import {Component, PropTypes} from 'react'
import $ from 'jquery'
import {Tabs, Tab} from 'material-ui/Tabs'
import Table from 'react-bootstrap/lib/Table'
import SwipeableViews from 'react-swipeable-views'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {tagSelectedAction} from '../../store/tagSelectedAction'
import FlatButton from 'material-ui/FlatButton'
import {newMarkerTimeAction} from '../../store/newMarkerTimeAction'
import {addButtonClickedAction} from '../../store/addButtonClickedAction'
import {editButtonClickedAction} from '../../store/editButtonClickedAction'

const FLAGS_LIST = [
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'}
]

const TABS_LIST = [
    'Tags',
    'Info'
]

const inactiveStyle = {
    backgroundColor: '#D7D7D7',
    color: '#5A5A5A'
}
var clickIndex;
class VideoDetails extends Component {
    state = {
        tabIndex: 0,
        tags:[],
        clickedIndex:-1,
        time_in:0,
        time_out:0,
        tag_type:"smoking",
        category:"compliance"

    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    }


    switchTabs = (tabIndex) => {
        this.setState({tabIndex})
    }

    toAdd = () => {
        //console.log(this.props.tag_fetch_reducer.tags)
        this.props.addButtonClickedAction(true);
        this.context.router.push('/add')
    }
    toEdit = () => {
        var tagArray = this.props.tag_fetch_reducer.tags;
        let time_in= this.secondsToHms(tagArray[clickIndex].time)
        console.log(time_in)
        let time_out = this.secondsToHms(tagArray[clickIndex].stopTime)
        let tag_type= tagArray[clickIndex].tagname
        let category = tagArray[clickIndex].category
        //console.log(this.props.tag_fetch_reducer.tags)
        console.log(this.state.time_in)
        this.props.editButtonClickedAction(true, time_in, time_out, tag_type, category);
        this.context.router.push('/edit')
    }

    handleRowClick = (row) => {

        //this.setState({clickedIndex:row})
        clickIndex =row;
        console.log(clickIndex)
        this.props.tagSelectedAction(row)


    }
    handleEditRowClick = (row) => {

    }
    // secondsToHms =(d) =>{
    //     d = Number(d);
    //     var a = d % 3600 % 60;
    //     var h = Math.floor(d / 3600);
    //     var m = Math.floor(d % 3600 / 60);
    //     var s = Math.floor(d % 3600 % 60);
    //     var f = a -s ;
    //     return ((h > 0 ? h + ":" + (m < 10 ? "00" : "") : "00:") + "0"+ m + ":" + (s < 10 ? "0" : "") + s); }

    secondsToHms (input, fps) {
        var pad = function (input) {
            return (input < 10) ? "0" + input : input;
        };
        fps = (typeof fps !== 'undefined' ? fps : 24 );
        return [
            pad(Math.floor(input / 3600)),
            pad(Math.floor(input % 3600 / 60)),
            pad(Math.floor(input % 60)),
            pad(Math.floor(input * fps % fps))
        ].join(':');
    }
    render() {
        var that = this;
        var {className} = this.props;
        var cx = `${className || ''} video-details-container`

        var tagIndex = 0;
        //var x = document.getElementsByTagName("tr");

        //x[this.props.marker_reached_reducer.index].style.backgroundColor = "#FFF000"


        //this.setState({tagIndex:this.props.marker_reached_reducer.index})

        return (
            <div className='flex-vertical'>
                <Table className='flags-table' id="flags-table" responsive hover>
                    <thead>
                    <tr>
                        <th></th>
                        <th> Time In</th>
                        <th> Time Out</th>
                        <th> Type</th>
                        <th> Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.tag_fetch_reducer.tags.map((x, i) => (
                            <tr className={i === this.props.marker_reached_reducer.index ? 'selected' : ''} key={i} onClick={this.handleRowClick.bind(this, i)}>
                                <td>
                                    <div className='red-box'></div>
                                </td>
                                <td> {this.secondsToHms(x.time)} </td>
                                <td> {this.secondsToHms(x.stopTime)} </td>
                                <td> {x.tagname} </td>
                                <td> {x.category}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <div className='flex-fill'/>
                <div className='table-footer'>
                    <FlatButton
                        onClick={this.toEdit.bind(this)}
                        label='EDIT'
                        style={{
                            backgroundColor: '#D7D7D7',
                            borderRadius: 0,
                            height: '36px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            marginRight:'10px'
                        }}/>
                    <FlatButton
                        onClick={this.toAdd.bind(this)}
                        label='ADD'
                        style={{
                            backgroundColor: '#D7D7D7',
                            borderRadius: 0,
                            height: '36px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                        }}/>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        // tags: state.tagReducer,
        marker_store: state.markerReducer,
        video_file_reducer: state.VideoFileSelectedReducer,
        tag_fetch_reducer:state.tagFetchReducer,
        marker_reached_reducer:state.markerReachedReducer
    };
};
function matchDispatchToProps(dispatch) {
    return bindActionCreators({tagSelectedAction: tagSelectedAction, newMarkerTimeAction: newMarkerTimeAction, addButtonClickedAction: addButtonClickedAction, editButtonClickedAction:editButtonClickedAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(VideoDetails);