import {Component, PropTypes} from 'react'


class VideoInfo extends Component {
    render(){
        return (
            <div className='video-info'>
                {this.props.fileName}
            </div>
        )
    }
}

export default VideoInfo

