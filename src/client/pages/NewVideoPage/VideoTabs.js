/**
 * Created by root on 3/17/17.
 */
import {Component, PropTypes} from 'react'

import {Tabs, Tab} from 'material-ui/Tabs'
import Table from 'react-bootstrap/lib/Table'
import SwipeableViews from 'react-swipeable-views'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {tagSelectedAction} from '../../store/tagSelectedAction'
import FlatButton from 'material-ui/FlatButton'
import TabInfo from './TabInfo'
import TabTags from './TabTags'
import TabMarker from './TabMarker'
import EditTab from './EditTab'
import VideoComment from './VideoComment'

import {addButtonClickedAction} from '../../store/addButtonClickedAction'
import {editButtonClickedAction} from '../../store/editButtonClickedAction'
import {doneButtonClickedAction} from '../../store/doneButtonClickedAction'


const FLAGS_LIST = [
    {time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'car', category: 'Objects'}
]

const TABS_LIST = [
    'Tags',
    'Info',

]
const styles = {
    swipeable: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        height: '100%'
    }
}

const inactiveStyle = {
    backgroundColor: '#D7D7D7',
    color: '#5A5A5A'
}

class VideoTabs extends Component {
    state = {
        tabIndex: 0
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    switchTabs = (tabIndex)=> {
        this.setState({tabIndex})
    }

    toHome = ()=> {
        this.context.router.push('/')
    }

    handleRowClick = (row)=> {
        this.props.tagSelectedAction(row)
    }
    onAddClick = ()=> {
        this.props.addButtonClickedAction(true);
        this.setState({tabIndex: 2})

    }

    onEditClick = ()=> {
        this.props.addButtonClickedAction(true);
        this.setState({tabIndex: 3})

    }

    onDoneClick = ()=> {
        this.props.doneButtonClickedAction(false);
        this.setState({tabIndex: 0})

    }
    render(){
        var {className} = this.props;
        var cx = `${className || ''} video-details-container`

        return (

                <div className='video-player-tabs'>
                    <Tabs
                        value={this.state.tabIndex}
                        onChange={this.switchTabs}>
                        <Tab value={0} label='TAGS'/>
                        <Tab value={1} label='INFO'/>
                        {/*{*/}
                            {/*TABS_LIST.map((x,i)=> (*/}
                                {/*<Tab label={x} value={i} key={i} style={ this.state.tabIndex !== i ? inactiveStyle : {} } onClick={this.handleClick}/>*/}
                            {/*))*/}
                        {/*}*/}
                    </Tabs>
                        <SwipeableViews
                            index={this.state.tabIndex}
                            onChangeIndex={this.switchTabs}
                            style={styles.swipeable}
                            containerStyle={styles.container}>
                            <TabTags
                                //current={current}
                                className='swipeable-view'
                                onAddClick={this.onAddClick}
                                onEditClick={this.onEditClick}
                                />
                            <TabInfo
                                className='swipeable-view'/>
                            <TabMarker
                                //current={current}
                                className='swipeable-view'
                                //onCancelClick={this.onCreateCancelClick}
                                onDoneClick={this.onDoneClick}
                                />
                            <EditTab
                                //current={current}
                                className='swipeable-view'
                                //onCancelClick={this.onCreateCancelClick}
                                onDoneClick={this.onDoneClick}
                            />
                            {/*{this.props.children}*/}
                            {/*<div>*/}
                                {/*<div className="detail-div">*/}
                                    {/*<h4>Video Info</h4>*/}
                                {/*</div>*/}
                                {/*<div id="tile-div" className="detail-div">*/}
                                    {/*<h4>Title</h4>*/}
                                    {/*<h4>{this.props.video_file_selected.videoName}</h4>*/}
                                {/*</div>*/}
                                {/*<div className="detail-div">*/}
                                    {/*<h4>Uploaded on</h4>*/}
                                    {/*<h4>17-02-2017</h4>*/}
                                {/*</div>*/}
                                {/*<div className="detail-div">*/}
                                    {/*<h4>Duration</h4>*/}
                                    {/*<h4>{this.props.video_file_selected.videoDuration}</h4>*/}
                                {/*</div>*/}
                                {/*<div className="detail-div">*/}
                                    {/*<h4>Dimensions</h4>*/}
                                    {/*<h4>{this.props.video_file_selected.video_width + "X" + this.props.video_file_selected.video_height}</h4>*/}
                                {/*</div>*/}
                                {/*<div className="detail-div">*/}
                                    {/*<h4>Frame-rate</h4>*/}
                                    {/*<h4>{this.props.video_file_selected.frame_rate}</h4>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </SwipeableViews>
                </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        // tags: state.tagReducer,
        marker_store:state.markerReducer,
        video_file_selected: state.VideoFileSelectedReducer
    };
};
function matchDispatchToProps(dispatch) {
    return bindActionCreators({tagSelectedAction: tagSelectedAction, addButtonClickedAction: addButtonClickedAction, editButtonClickedAction:editButtonClickedAction, doneButtonClickedAction: doneButtonClickedAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(VideoTabs);