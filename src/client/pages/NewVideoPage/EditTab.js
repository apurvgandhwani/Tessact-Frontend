import {Component, PropTypes} from 'react'
import classnames from 'classnames'

import {connect} from 'react-redux'

import GreyButton from 'components/ui/GreyButton'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import {bindActionCreators} from 'redux';
//import {actions as tagActions} from 'store/Tags'

const debug = require('debug')('tessact:pages:video-tab-marker')

const TAGS_TABLE_MAP = {
    'Time In' : 'time',
    'Time Out': 'stopTime',
    'Type': 'tagname',
    'Category': 'category'
}

const TAG_TYPES = [
    'smoking',
    'alcohol',
    'type A',
    'type B'
]

const TAG_CATEGORIES = [
    'Compliance',
    'Category A',
    'Category B',
    'Category C',
]


class EditTab extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        onDoneClick: PropTypes.func.isRequired
    }

    constructor() {
        super();
        this.state = {
            added_tags: []
        };
    }

    secondsToHms(input, fps) {
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

    // handleCategoryChange = (e, index)=> {
    // 	const category = TAG_CATEGORIES[index]
    // 	debug('Setting category: ', category)
    // 	this.props.setTagCategory(category)
    // }
    //
    // handleTagNameChange = (e, index)=> {
    // 	const tagname = TAG_TYPES[index]
    // 	debug('Setting TagName: ', tagname)
    // 	this.props.setTagTagName(tagname)
    // }
    //
    onDoneClick = ()=> {
        this.props.onDoneClick()
        // this.props.saveTag()
        // 	.then(()=> {
        // 		this.props.onDoneClick()
        // 	})

    }

    render(){
        const {
            className,
            //currentTag
        } = this.props;

        //const tag = currentTag || {}

        //const selected_tag = TAG_TYPES.indexOf(tag.tagname)
        //const selected_cat = TAG_CATEGORIES.indexOf(tag.category)
        // console.log(selected_cat, selected_tag)

        const cx = classnames(className, 'marker-view')
        return (
            <div className={cx}>
                <div className='marker-view-body'>
                    <h3 className='control-label'>Add Tag</h3>
                    <div className='control'>
                        <div className='control-label'> Time In </div>
                        <div className='control-field'>
                            <TextField
                                style={{
                                    border: '2px rgba(0,0,0,1) solid',
                                    padding: '0 20px'
                                }}
                                underlineShow={false}
                                id='tag-time-in'
                                value={this.secondsToHms(this.props.new_marker_reducer.start)}/>
                        </div>
                    </div>
                    <div className='control'>
                        <div className='control-label'> Time Out </div>
                        <div className='control-field'>
                            <TextField
                                style={{
                                    border: '2px rgba(0,0,0,1) solid',
                                    padding: '0 20px'
                                }}
                                underlineShow={false}
                                id='tag-time-out'
                                value={this.secondsToHms(this.props.new_marker_reducer.end)}/>
                        </div>
                    </div>
                    <div className='control'>
                        <div className='control-label'> Tag Name </div>
                        <div className='control-field'>
                            <select>
                                <option>Compliance</option>
                            </select>
                        </div>
                    </div>
                    <div className='control'>
                        <div className='control-label'> Category </div>
                        <div className='control-field'>
                            <select>
                                <option>Smoking</option>
                                <option>Alcohol</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='marker-view-footer'>
                    <GreyButton
                        onClick={this.onDoneClick}
                        label='DONE'/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        new_marker_reducer: state.newMarkerReducer,
        token_Reducer: state.tokenReducer,
    };
};
// const mapDispatchToProps = (dispatch)=> ({
// 	saveTag(){
// 		return dispatch(tagActions.saveTag())
// 	},
// 	setTagTagName(tagname){
// 		return dispatch(tagActions.setTagTagName(tagname))
// 	},
// 	setTagCategory(category){
// 		return dispatch(tagActions.setTagCategory(category))
// 	},
// 	setTagRange(start, stop){
// 		return dispatch(tagActions.setTagRange(start, stop))
// 	}
// })

// function matchDispatchToProps(dispatch) {
//     return bindActionCreators({doneButtonClickedAction: doneButtonClickedAction}, dispatch);
// }

export default connect(mapStateToProps)(EditTab)