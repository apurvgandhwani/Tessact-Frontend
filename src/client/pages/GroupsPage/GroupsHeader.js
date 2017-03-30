import {Component, PropTypes} from 'react'
import classnames from 'classnames'


import {Tabs, Tab} from 'material-ui/Tabs'


const styles = {
	tab: {
		padding: '2px 34px',
		width: '140px',
		height: '72px',
		color: '#4b4b4b'
	},
	tabItemContainer: {
		background: 'none'
	}
}

class GroupsHeader extends Component {
	state = {
		selectedTab: 0
	}

	handleTabChange = (selectedTab)=> {
		console.log('selecting tab: ', selectedTab)
		this.setState({selectedTab})
	}

	render(){
		const {
			className
		} = this.props
		
		const cx = classnames(className)
		
		// Current group title
		const title = 'Group Name'

		return (
			<div className={cx}>
				<div className='header-title'> {title} </div>
				<div className='header-actions'>
					<Tabs
						tabItemContainerStyle={styles.tabItemContainer}
						value={this.state.selectedTab}
						onChange={this.handleTabChange}>
						<Tab
							value={0}
							buttonStyle={styles.tab}
							label={<span style={{color: '#4b4b4b', margin: '25'}}>Members</span>}/>
						<Tab
							value={1}
							//buttonStyle={styles.tab}
							label={<span style={{color: '#4b4b4b', margin: '25'}}>Permissions</span>}/>
					</Tabs>
				</div>
			</div>
		)
	}
}

export default GroupsHeader