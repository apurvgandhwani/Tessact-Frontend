import {Component, PropTypes} from 'react'
import classnames from 'classnames'

import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import AddIcon from 'material-ui/svg-icons/content/add'
import DeleteIcon from 'material-ui/svg-icons/content/clear'
import ListIcon from 'material-ui/svg-icons/action/view-list'
import GridIcon from 'material-ui/svg-icons/action/view-module'
import FlatButton from 'material-ui/FlatButton'
import GreyButton from '../../components/ui/GreyButton'


import {ORANGE} from 'utils/colors'

const styles = {
	searchButton: {
		height: '36px',
		width: '44px',
		backgroundColor: ORANGE,
		border: '1px rgba(0,0,0,0.2) solid',
		borderWidth: '1px 1px 1px 0',
		padding: '6px 6px',
		marginRight:'4px'
	},
	button: {
		backgroundColor: 'rgba(0,0,0,0.2)',
		marginLeft: '20px'
	},
	searchButton__hovered: {
		borderColor: ORANGE
	},
	toggleMode: {
		position: 'absolute',
		right: '6px',
		top: '60px',
		zIndex: 600,
		color: '#4b4b4b'
	}
}

const debug = require('debug')('tessact:pages:group-members-header')

class MembersListHeader extends Component {

	searchMembers = (e)=> {
		const query = e.target.value;
		debug('Will search query: ' + query)
	}

	toggleMode = ()=> {
		const mode = this.props.mode === 'list' 
			? 'grid' 
			: 'list';
		debug('Toggling Mode: ', mode)
		this.props.onModeToggle(mode)
	}

	render(){
		const {
			className,
			mode
		} = this.props;
		const cx = classnames(className)
		return (
			<div className={cx}>
				<div className='search-box'>
					<input 
						className='search-input'
						type='text'
						ref={node=> this.search_input = node}
						placeholder='Search'
						onInput={this.searchMembers}
						/>
					<IconButton
						hoveredStyle={styles.searchButton__hovered}
						style={styles.searchButton}
						className='search-button'>
						<SearchIcon color='#fff'/>
					</IconButton>
				</div>
				
				<GreyButton
					icon={<AddIcon style={{color:'#4b4b4b'}}/>}
					//style={styles.button}
					label='Add'/>
				<GreyButton
					icon={<DeleteIcon style={{color:'#fff'}}/>}
					//style={styles.button}
					label='Remove'/>
				<IconButton
					style={styles.toggleMode}
					onClick={this.toggleMode}>
					{
						mode === 'grid' ? <ListIcon/> : <GridIcon/>
					}
				</IconButton>
			</div>
		)
	}
}

export default MembersListHeader