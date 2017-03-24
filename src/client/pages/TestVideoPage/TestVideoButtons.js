import {Component, PropTypes} from 'react'
import classnames from 'classnames'

const debug = require('debug')('tessact:pages:video-player-buttons')

const BUTTONS_LIST = [
	{ id: 1, text: 'Cigarettes'},
	{ id: 2, text: 'Alcohol'},
	{ id: 3, text: 'Nudity'},
	{ id: 4, text: 'Blood'},
	{ id: 5, text: 'Violence'}
]

class TestVideoButtons extends Component {
	
	onButtonSelected = (selectedIndex)=> {
		const  button = BUTTONS_LIST[selectedIndex]
		debug('Selected:', button)
	}

	render(){
		return (
			<div className='video-player-buttons'>
				{
					BUTTONS_LIST.map((x, i)=> (
						<div 
							className='button-item'
							key={x.id}		// Try to keep this value unique
							onClick={()=> this.onButtonSelected(i)}>
							{x.text}
						</div>
					))
				}
			</div>
		)
	}
}

export default TestVideoButtons