import {Component, PropTypes} from 'react'
import classnames from 'classnames'

import FlatButton from 'material-ui/FlatButton'
import GroupsList from './GroupsList'

import AddIcon from 'material-ui/svg-icons/content/add'

import {ORANGE} from 'utils/colors'

const styles = {
	button: {
		backgroundColor: ORANGE,
		height: '50px',
		color: '#fff',
		width: '100%'
	}
}

class GroupsSidebar extends Component {
	render(){
		const {
			className,
			list,
			currentGroup,
			onGroupSelected
		} = this.props
		
		const cx = classnames(className)
		

		return (
			<div className={cx}>
				<GroupsList
					list={list}
					selectedId={currentGroup.id || false}
					onGroupSelected={onGroupSelected}
					className='groups-list'
					/>
				<div className='bottom-action'>
					<FlatButton
						icon={<AddIcon color='#fff'/>}
						label='Add New Group'
						style={styles.button}/>
				</div>
			</div>
		)
	}
}

export default GroupsSidebar