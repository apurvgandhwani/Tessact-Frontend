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
import Select from 'react-select';
const debug = require('debug')('tessact:pages:video-tab-marker')

const TAGS_TABLE_MAP = {
	'Time In' : 'time',
	'Time Out': 'stopTime',
	'Type': 'tagname',
	'Category': 'category'
}

const ACTORS = [
    { label: 'Sameer', value: '1' },
    { label: 'Aditya', value: '2' },
    { label: 'Anjely', value: '3' },
    { label: 'Kavya', value: '4' },
    { label: 'Monish', value: '5' },
    { label: 'Kaira', value: '6' },
];
const EMOTIONS = [
    { label:"Happy",value: '11' },
    { label:"Angry",value: '12' },
    { label:"Excited",value: '13' },
    { label:"Sad",value: '14' },
    { label:"Shocked",value: '15' },
    { label:"Normal",value: '16' },
];
const ACTIONS	 = [
    { label:"Fight",value: "21" },
    { label:"Crying",value: '22' },
    { label:"Dancing",value: '23' },
    { label:"Love Making",value: '24' },
    { label:"Running",value: '25' },
    { label:"Driving",value: '26' },
];

const COMPLIANCE = [
    { label:"Smoking",value: '31' },
    { label:"Alcohol",value: '32' },
    { label:"Blood",value: '33' },
    { label:"Nudity",value: '34' },
    { label:"Vulgar Words",value: '35' },
    { label:"Abuse",value: '36' },
];
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

var actor_array, action_array, emotion_array;

class TabMarker extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		onDoneClick: PropTypes.func.isRequired
	}

    constructor() {
        super();
        this.state = {
            added_tags: [],
            actor_options: ACTORS,
			emotion_options: EMOTIONS,
			action_options:ACTIONS,
			compliance_options:COMPLIANCE,
            actor_value: ",",
			emotion_value: ",",
			action_value: ",",
			compliance_value: "",

        };
    }

    handleActorSelectChange (value) {
        console.log('You\'ve selected:', value);
        //console.log(typeof this.state.actor_value)
        this.setState({ actor_value: value });

    }
    handleEmotionSelectChange (value) {
        console.log('You\'ve selected:', value)
        this.setState({ emotion_value: value });

    }
    handleActionSelectChange (value) {
        console.log('You\'ve selected:', value);
        this.setState({ action_value: value });

    }
    handleComplianceSelectChange (value) {
        console.log('You\'ve selected:', value);
        this.setState({ compliance_value: value.value });
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

    AppendClick(){
		console.log(this.state.actor_value, this.state.action_value, this.state.emotion_value)
		//this.state.added_tags.push({"actors":this.state.actor_value, "actions":this.state.action_value, "compliance":this.state.compliance_value, "emotions":this.state.emotion_value})
		//this.state.actor_value.split(',').concat(this.state.action_value.split(','), this.state.emotion_value.split(','));

        // var actor_array, action_array, emotion_array
        //


        if(this.state.actor_value.indexOf(',') > -1){
			actor_array = this.state.actor_value.split(',')
        }
        if(this.state.actor_value.indexOf(',') == -1){
        	actor_array = [];
		}
        if(this.state.action_value.indexOf(',') > -1){
            action_array = this.state.action_value.split(',')
        }
        if(this.state.action_value.indexOf(',') == -1){
            action_array = [];
        }
        if(this.state.emotion_value.indexOf(',') > -1){
            emotion_array = this.state.emotion_value.split(',')
        }
        if(this.state.emotion_value.indexOf(',') == -1){
            emotion_array = [];
        }
        this.setState({added_tags: actor_array.concat(action_array, emotion_array)})
        console.log(actor_array.concat(action_array, emotion_array))
		//console.log(this.state.added_tags)

        this.setState({actor_value:[],action_value:[],emotion_value:[],compliance_value:[]})
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
									border: '2px rgba(0,0,0,0.4) solid',
									padding: '0 20px',
                                    maxWidth:"400", minWidth:'350'
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
									border: '2px rgba(0,0,0,0.4) solid',
									padding: '0 20px',
                                    maxWidth:"400", minWidth:'350'
								}}
								underlineShow={false}
								id='tag-time-out'
								value={this.secondsToHms(this.props.new_marker_reducer.end)}/>
						</div>
					</div>
					<div className='control'>
						<div className='control-label'> Compliance </div>
						<div className='control-field' style={{border: '2px rgba(0,0,0,0.4) solid', maxWidth:"400", minWidth:'350' }}>
							<Select
									 value={this.state.compliance_value}
									 placeholder="Select your favourite(s)"
									 options={this.state.compliance_options}
									 onChange={this.handleComplianceSelectChange.bind(this)} />
						</div>
					</div>
					<div className='control'>
						<div className='control-label'> Actors </div>
						<div className='control-field' style={{border: '2px rgba(0,0,0,0.4) solid', maxWidth:"400", minWidth:'350' }}>
							<Select multi simpleValue
									value={this.state.actor_value}
									placeholder="Select actors"
									options={this.state.actor_options}
									onChange={this.handleActorSelectChange.bind(this)} />
						</div>
					</div>
					<div className='control'>
						<div className='control-label'> Emotions </div>
						<div className='control-field' style={{ border: '2px rgba(0,0,0,0.4) solid', maxWidth:"400", minWidth:'350' }}>
							<Select multi simpleValue
									value={this.state.emotion_value}
									placeholder="Select suitable Emotion(s)"
									options={this.state.emotion_options}
									onChange={this.handleEmotionSelectChange.bind(this)} />
						</div>
					</div>
					<div className='control'>
						<div className='control-label'> Action </div>
						<div className='control-field' style={{border: '2px rgba(0,0,0,0.4) solid', maxWidth:"400", minWidth:'350' }}>
							<Select multi simpleValue
									value={this.state.action_value}
									placeholder="Select suitable action(s)"
									options={this.state.action_options}
									onChange={this.handleActionSelectChange.bind(this)} />
						</div>
					</div>
					<div className='control'>
						<div className='control-label'> Description </div>
						<div className='control-field' style={{border: '2px rgba(0,0,0,0.4) solid', maxWidth:"400", minWidth:'350' }}>
							<input  style={{maxWidth:"400", minWidth:'350', height:"35"}} className="tag_description" id="tag_description" type="username"  placeholder="Scene description"/>
					</div>
					</div>

				</div>

					<div className='marker-view-footer'>
					<GreyButton
						onClick={this.AppendClick.bind(this)}
						label='APPEND'/>
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

export default connect(mapStateToProps)(TabMarker)