import {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './TestVideoPage.styl'


import TestVideoPlayer from './TestVideoPlayer'
import TestVideoButtons from './TestVideoButtons'
import VideoTabs from './VideoTabs'
import VideoComment from './VideoComment'
import DummyPlayer from './DummyPlayer'
import VideoInfo from './VideoInfo'
// import PlaneVideoPlayer from './PlaneVideoPlayer'
//import {actions as mfActions} from 'store/MediaFiles'
//import {actions as tagActions} from 'store/Tags'

const debug = require('debug')('tessact:pages:video-page')

class TestVideoPage extends Component {

    componentWillMount = () => {
        // const {list} = this.props;
        // const id = this.props.routeParams.videoId || false;
        //
        // this.props
        //     .fetchMediaFiles()
        //     .then(()=> {
        //         debug('Fetched media')
        //         return !id
        //             ? Promise.resolve()
        //             : this.props.selectMediaFile(id)
        //     }).then(()=> {
        //     debug('Selected Media File: ', id)
        // })
        //     .catch(console.error.bind(console))
    }

    render() {
        // const {
        //     className,
        //     list,
        //     selectedId
        // } = this.props;

        const cx = classnames(c.container)

        // const current = (
        //     list.filter(x => x.video.id === selectedId) || [{}]
        // )[0]

        return (
            <div className={c.container}>
                <div className='left-side'>
                    <DummyPlayer/>
                    <VideoInfo fileName= {this.props.video_file_selected_reducer.videoName}/>
                    <TestVideoButtons/>
                </div>
                <div className='right-side'>
                    <VideoTabs/>
                    <VideoComment
                    />
                </div>
            </div>
        )
    }
}
//
const mapStateToProps = (state)=> ({
    // list: state.MediaFiles.list,
    // selectedId: state.MediaFiles.selectedId
    video_file_selected_reducer: state.VideoFileSelectedReducer

})
//
// const mapDispatchToProps = (dispatch)=> ({
//     fetchMediaFiles(){
//         return dispatch(mfActions.fetchMediaFiles())
//     },
//     selectMediaFile(id){
//         return dispatch(mfActions.selectMediaFile(id))
//     },
//     createNewTag(){
//         return dispatch(tagActions.createNewTag())
//     }
// })

export default withStyles(c)(
    connect(mapStateToProps)(TestVideoPage)
)
