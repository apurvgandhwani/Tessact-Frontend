import {Component} from 'react'
import {connect} from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './VideoScreen.styl'

import VideoDetails from './VideoDetails'


const PROCESS_LIST = [
	'Cigarettes',
	'Alcohol',
	'Nudity',
	'Blood',
	'Violence'
]

class VideoScreen extends Component {
	render(){
		var item = this.props.currentItem || {};
		var name = item.file_name || 'No Item Selected';

		return (
			<div className={c.container}>
				<div className='video-section'>
					<div className='video-container'>
						<div className='video-player'></div>
						
					</div>
					<div className='video-title'> {name} </div>
					<div className='process-list'>
						{
							PROCESS_LIST.map((x,i)=> (
								<div 
									className='process-item' 
									key={i}> {x} </div>
							))
						}
					</div>
				</div>
				<div className='details-section'>
					<VideoDetails/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=> ({
	currentItem: state.Data.currentItem
})

export default withStyles(c)(
	connect(mapStateToProps)(VideoScreen)
)