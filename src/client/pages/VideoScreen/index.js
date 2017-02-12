import {Component} from 'react'
import {connect} from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './VideoScreen.styl'
import Player from './Player'

import VideoDetails from './VideoDetails'


const PROCESS_LIST = [
	'Cigarettes',
	'Alcohol',
	'Nudity',
	'Blood',
	'Violence'
]

class VideoScreen extends Component {

    toHome(){
    	console.log('clicked')

    }
	render(){
		var item = this.props.currentItem || {};
		var name = item.file_name || 'No Item Selected';

		return (
			<div className={c.container}>
				<div className='details-section'>
					<VideoDetails>
						{this.props.children}
					</VideoDetails>
				</div>
				<div className='video-section'>
					<Player/>
					<div className='video-title'> {this.props.video_file_selected_reducer.videoName} </div>
					<div className='process-list'>
                        {
                            PROCESS_LIST.map((x,i)=> (
								<div
									className='process-item'
									key={i}
									onClick={this.toHome.bind(this)}> {x} </div>
                            ))
                        }
					</div>

				</div>

			</div>
		)
	}
}

const mapStateToProps = (state)=> ({
	currentItem: state.Data.currentItem,
	video_file_selected_reducer: state.VideoFileSelectedReducer
})

export default withStyles(c)(
	connect(mapStateToProps)(VideoScreen)
)