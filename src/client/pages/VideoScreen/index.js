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

    toHome = ()=> {
    	console.log('clicked')
        this.context.router.push('/')
    }
	render(){
		var item = this.props.currentItem || {};
		var name = item.file_name || 'No Item Selected';

		return (
			<div className={c.container}>
				<div className='video-section'>
						<Player/>
					<div className='video-title'> {name} </div>
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