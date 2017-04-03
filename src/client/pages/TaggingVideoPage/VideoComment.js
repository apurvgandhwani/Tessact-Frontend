import {Component, PropTypes} from 'react'
import classnames from 'classnames'

import GreyButton from 'components/ui/GreyButton'


class VideoComment extends Component {
	render(){
		return (
			<div className='video-player-comment'>
				<textarea
					id='textarea-comment'
					placeholder='Your comment here'
					className='textarea-comment'/>
				<div className='comment-footer'>
					<GreyButton
						label='SUBMIT'/>
				</div>
			</div>
		)
	}
}

export default VideoComment