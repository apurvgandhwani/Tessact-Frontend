import {Component, PropTypes} from 'react'

import {Tabs, Tab} from 'material-ui/Tabs'
import Table from 'react-bootstrap/lib/Table'
import SwipeableViews from 'react-swipeable-views'

import FlatButton from 'material-ui/FlatButton'


const FLAGS_LIST = [
	{time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'Smoking', category: 'Compliance'},
	{time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'Smoking', category: 'Compliance'},
	{time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'Smoking', category: 'Compliance'},
	{time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'Smoking', category: 'Compliance'},
	{time_in: '00:00:03:07', time_out: '00:00:03:07' , type: 'Smoking', category: 'Compliance'}
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
	
	switchTabs = (tabIndex)=> {
		this.setState({tabIndex})
	}

	toHome = ()=> {
		this.context.router.push('/')
	}

	render(){
		var {className} = this.props;
		var cx = `${className || ''} video-details-container`

		return (
			<div className={cx}>
				<div className='tabbed-section'>
					<Tabs
						value={this.state.tabIndex}
						onChange={this.switchTabs}>
						{
							TABS_LIST.map((x,i)=> (
								<Tab label={x} value={i} key={i} style={ this.state.tabIndex !== i ? inactiveStyle : {} }/>
							))
						}
					</Tabs>
					<div className='tab-content'>
						<SwipeableViews
							index={this.state.tabIndex}
							onChangeIndex={this.switchTabs}
							containerStyle={{width: '100%', height: '100%'}}
							style={{width: '100%', height: '100%'}}>
							<div className='flex-vertical'>
								<Table className='flags-table' responsive hover>
									<thead>
										<tr>
											<th> </th>
											<th> Time In </th>
											<th> Time Out </th>
											<th> Type </th>
											<th> Category </th>
										</tr>
									</thead>
									<tbody>
										{
											FLAGS_LIST.map((x,i)=> (
												<tr key={i}>
													<td> <div className='red-box'></div> </td>
													<td> {x.time_in} </td>
													<td> {x.time_out} </td>
													<td> {x.type} </td>
													<td> {x.category} </td>
												</tr>
											))	
										}
									</tbody>
								</Table>
								<div className='flex-fill'/>
								<div className='table-footer'>
									<FlatButton 
										onClick={this.toHome}
										label='Back'
										style={{
											backgroundColor: '#D7D7D7',
											borderRadius: 0,
											height: '36px',
											paddingLeft: '16px',
											paddingRight: '16px',
										}}/>
								</div>
							</div>
							<div>
								Info
							</div>
						</SwipeableViews>
					</div>

				</div>
				<div className='comments-section'>
					<div className='flex-vertical'>
						<textarea id='comments-input' placeholder='Comments'/>
						<div className='comments-footer'>
							<FlatButton 
								label='SUBMIT'
								onClick={this.toHome}
								style={{
									backgroundColor: '#D7D7D7',
									borderRadius: 0,
									height: '36px',
									paddingLeft: '16px',
									paddingRight: '16px',
								}}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default VideoDetails