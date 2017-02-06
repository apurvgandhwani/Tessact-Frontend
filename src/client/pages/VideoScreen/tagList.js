import {Component, PropTypes} from 'react'

import {Tabs, Tab} from 'material-ui/Tabs'
import Table from 'react-bootstrap/lib/Table'
import SwipeableViews from 'react-swipeable-views'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {tagSelectedAction} from '../../store/tagSelectedAction'
import FlatButton from 'material-ui/FlatButton'
import {newMarkerTimeAction} from '../../store/newMarkerTimeAction'
import {addButtonClickedAction} from '../../store/addButtonClickedAction'

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

class VideoDetails extends Component {
    state = {
        tabIndex: 0
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

    handleRowClick = (row) => {
        this.props.tagSelectedAction(row)
    }


    render() {
        var that = this;
        var {className} = this.props;
        var cx = `${className || ''} video-details-container`

        return (


            <div className='flex-vertical'>
                <Table className='flags-table' responsive hover>
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
                        that.props.tag_fetch_reducer.tags.map((x, i) => (
                            <tr key={i} onClick={this.handleRowClick.bind(this, i)}>
                                <td>
                                    <div className='red-box'></div>
                                </td>
                                <td> {x.frame_in} </td>
                                <td> {x.frame_out} </td>
                                <td contentEditable="true"> {x.tagname} </td>
                                <td contentEditable="true"> {x.category}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <div className='flex-fill'/>
                <div className='table-footer'>
                    <FlatButton
                        onClick={this.toAdd}
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
        tag_fetch_reducer:state.tagFetchReducer
    };
};
function matchDispatchToProps(dispatch) {
    return bindActionCreators({tagSelectedAction: tagSelectedAction, newMarkerTimeAction: newMarkerTimeAction, addButtonClickedAction: addButtonClickedAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(VideoDetails);