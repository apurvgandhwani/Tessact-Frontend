/**
 * Created by root on 5/23/17.
 */
/**
 * Created by root on 3/17/17.
 */
import {Component, PropTypes} from 'react'
import noUiSlider from 'nouislider'
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
import Select from 'react-select';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {addButtonClickedAction} from '../../store/addButtonClickedAction'
import {editButtonClickedAction} from '../../store/editButtonClickedAction'
import {doneButtonClickedAction} from '../../store/doneButtonClickedAction'


const FLAGS_LIST = [
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'},
    {time_in: '00:00:03:07', time_out: '00:00:03:07', type: 'car', category: 'Objects'}
]

const TABS_LIST = [
    'Smoking',
    'Drinking', 'Nudity', 'Blood', 'Violence'

]
const styles = {
    swipeable: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        height: '100%'
    },
    categoryChange: {
        backgroundColor: "#FFF"
    },
    selectStyle: {
        borderColor: "#D3D3D3",
        width: '50'
    },
    tabs:{
        fontFamily: 'montserrat'
    }

}

const muiTheme = getMuiTheme({
    tabs: {
        backgroundColor: 'red'
    },
    inkBar: {
        backgroundColor: '#746AA8'
    }
})
const inactiveStyle = {
    backgroundColor: '#FFF',
    color: '#5A5A5A'
}


class VideoTabs extends Component {
    state = {
        tabIndex: 0
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentDidMount(){

        var noUi_slider = document.getElementById('noUiSlider');

        noUiSlider.create(noUi_slider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
    }

    switchTabs = (tabIndex) => {
        this.setState({tabIndex})
    }

    toHome = () => {
        this.context.router.push('/')
    }

    handleRowClick = (row) => {
        this.props.tagSelectedAction(row)
    }
    onAddClick = () => {
        this.props.addButtonClickedAction(true);
        this.setState({tabIndex: 2})

    }

    onEditClick = () => {
        this.props.addButtonClickedAction(true);
        this.setState({tabIndex: 3})

    }

    onDoneClick = () => {
        this.props.doneButtonClickedAction(false);
        this.setState({tabIndex: 0})

    }

    render() {
        var {className} = this.props;
        var cx = `${className || ''} video-details-container`

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="tagSection">
                    <div className='tagSectionHeader'>
                        <div className="tags-tab-container">
                            <Tabs
                                style={styles.tabs}
                                value={this.state.tabIndex}
                                onChange={this.switchTabs}>
                                {/*<Tab value={0} label='Smoking'/>*/}
                                {/*<Tab value={1} label='Alcohol'/>*/}
                                {/*<Tab value={2} label='Nudity'/>*/}
                                {/*<Tab value={3} label='Blood'/>*/}
                                {/*<Tab value={4} label='Violence'/>*/}
                                {
                                    TABS_LIST.map((x, i) => (
                                        <Tab label={x} value={i} key={i}
                                             style={ this.state.tabIndex !== i ? inactiveStyle : inactiveStyle}
                                             onClick={this.handleClick}/>
                                    ))
                                }
                            </Tabs>
                        </div>
                        <div className="tagCategoryChange" style={styles.categoryChange}>
                            <select className="selectpicker" style={styles.selectStyle}>
                                <option>Compliance</option>
                                <option>Faces</option>
                                <option>Brands</option>
                            </select>
                        </div>
                    </div>
                    <div className="tagSectionFooter">
                        <div id="noUiSlider" className="bg-success"></div>
                    </div>
                </div>

            </MuiThemeProvider>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        // tags: state.tagReducer,
        marker_store: state.markerReducer,
        video_file_selected: state.VideoFileSelectedReducer
    };
};
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        tagSelectedAction: tagSelectedAction,
        addButtonClickedAction: addButtonClickedAction,
        editButtonClickedAction: editButtonClickedAction,
        doneButtonClickedAction: doneButtonClickedAction
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(VideoTabs);