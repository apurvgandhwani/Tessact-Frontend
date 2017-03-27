import {Component, PropTypes} from 'react'
import classnames from 'classnames'

import {connect} from 'react-redux'
//import {actions as tagActions} from 'store/Tags'
//import {secondsToHMS} from 'utils/index'
import {bindActionCreators} from 'redux';
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import GreyButton from 'components/ui/GreyButton'
import Table from 'react-bootstrap/lib/Table'

import {newMarkerTimeAction} from '../../store/newMarkerTimeAction'
import {addButtonClickedAction} from '../../store/addButtonClickedAction'
import {editButtonClickedAction} from '../../store/editButtonClickedAction'
import {tagSelectedAction} from '../../store/tagSelectedAction'

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

const debug = require('debug')('tessact:pages:video-tab-tags')

const HeaderItem = ({index, text})=> (
	<div className={`header-item header-${index + 1}`}>
		{text}
	</div>
)

const RowItem = ({item, index})=> (
	<div className='list-item'>

	</div>
)

class TabTags extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		onAddClick: PropTypes.func.isRequired,
        onEditClick: PropTypes.func.isRequired
	}

    state = {
        buttonDisabled: true
    };

	componentDidMount = ()=> {
		//const {list} = this.props;
		//this.props.fetchTags()
	}

	componentDidUpdate = ()=> {
		//const tag = this.props.currentTag
		//const id = tag.id || tag.tempId

		// There is an active item
		//if (id && id.toString().length){
		//	$(document).trigger('rangeslider:show')
		//}
	}

	// handleTypeChange = (e, index)=> {
	// 	const tagname = TAG_TYPES[index]
	// 	debug('Updating TagName: ', tagname)
	// 	this.props.setTagTagName(tagname)
	// }
    //
	// handleCategoryChange = (e, index)=> {
	// 	const category = TAG_CATEGORIES[index]
	// 	debug('Updating Category: ', category)
	// 	this.props.setTagCategory(category)
	// }
    //
	// selectTag = (tag)=> (e)=> {
	// 	const id = tag.id ? tag.id : tag.tempId
	// 	const current = this.props.currentTag;
	// 	const current_id = current.id ? current.id : current.tempId
    //
	// 	if (id === current_id){
	// 		return console.log('same tag: ', id, current_id)
	// 	}
	// 	console.log('tag selected: ', id)
	// 	this.props.selectTag(id)
	// }
    //
	// renderEditableType = (item)=> {
	// 	const valueIndex = TAG_TYPES.indexOf(item.tagname)
	// 	return (
	// 		<DropDownMenu
	// 			value={valueIndex}
	// 			labelStyle={{paddingLeft: '11px'}}
	// 			onChange={this.handleTypeChange}>
	// 			{
	// 				TAG_TYPES.map((x, i)=> (
	// 					<MenuItem key={i} value={i} primaryText={x}/>
	// 				))
	// 			}
	// 		</DropDownMenu>
	// 	)
	// }
    //
	// renderEditableCategory = (item)=> {
	// 	const valueIndex = TAG_CATEGORIES.indexOf(item.category)
	// 	return (
	// 		<DropDownMenu
	// 			value={valueIndex}
	// 			labelStyle={{paddingLeft: '11px'}}
	// 			onChange={this.handleCategoryChange}>
	// 			{
	// 				TAG_CATEGORIES.map((x, i)=> (
	// 					<MenuItem key={i} value={i} primaryText={x}/>
	// 				))
	// 			}
	// 		</DropDownMenu>
	// 	)
	// }
	//


    handleRowClick = (row, startTime, endTime) => {

        //this.setState({clickedIndex:row})
        this.setState({buttonDisabled:false})
       // clickIndex =row;
        console.log(startTime)
        this.props.tagSelectedAction(row, startTime, endTime)

    }
	onDoneClick = ()=> {
		// Update marker back in list
		// this.props.saveEdited()
		// 	.then(()=> this.props.saveTag())
		console.log(this.props.tag_fetch_reducer.tags[1])
	}



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

	render(){
		var {
			className,
			//list,
			//currentTag
		} = this.props

		// list = _.sortBy(list, 'time')

		const cx = classnames(className, 'tags-view')
		return (
			<div className={cx}>
				<div className='tags-table'>
				<Table className='flags-table' id="flags-table">
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
							<tr className={i === this.props.marker_reached_reducer.index ? 'selected' : ''} key={i} onClick={this.handleRowClick.bind(this, i,  x.time, x.stopTime)}
								 >
								<td>
									<div className={x.tagname === 'smoking'? 'red-box' : 'yellow-box'}></div>
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
				</div>
				<div className='tags-table-actions'>
                    <GreyButton
							onClick={this.props.onEditClick}
							label='Edit'
							disabled={this.state.buttonDisabled}
					/>
					<GreyButton
						onClick={this.props.onAddClick}
						label='ADD'/>
				</div>
			</div>
		)
	}
}
//
// const mapStateToProps = (state)=> ({
// 	list: state.Tags.list,
// 	currentTag: state.Tags.currentTag,
// 	selectedId: state.Tags.selectedId
// })
//
// const mapDispatchToProps = (dispatch)=> ({
// 	saveEdited(){
// 		return dispatch(tagActions.saveEditedTag())
// 	},
// 	fetchTags(){
// 		return dispatch(tagActions.fetchTags())
// 	},
// 	selectTag(id){
// 		return dispatch(tagActions.selectTag(id))
// 	},
// 	createNewTag(){
// 		return dispatch(tagActions.createNewTag())
// 	},
// 	setTagTagName(tagname){
// 		return dispatch(tagActions.setTagTagName(tagname))
// 	},
// 	setTagCategory(category){
// 		return dispatch(tagActions.setTagCategory(category))
// 	},
// 	saveTag(){
// 		return dispatch(tagActions.saveTag())
// 	}
// })


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

export default connect(mapStateToProps,matchDispatchToProps)(TabTags)