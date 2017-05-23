/**
 * Created by root on 3/16/17.
 */
import {Component, PropTypes} from 'react'
import classnames from 'classnames'

// import videojs from 'video.js/es5/video'
window.videojs = window.videojs || videojs
import 'video.js/dist/video-js.css'
import {connect} from 'react-redux'
// import 'videojs-markers/dist/videojs.markers.css'
// import 'videojs-markers/dist/videojs-markers.js'

const debug = require('debug')('tessact:pages:video-player')
var player;
class TestVideoPlayer extends Component {
    constructor() {
        super();
        this.state = {
            player: {},
            tags:[{category: "Compliance",
                stopTime: 10,
                text:"Car",
                time: 0}]
        };
    }
    componentDidMount = ()=> {
        this.init()
        window.vp = this
        // $(document).on('create:new-tag', this.createNewTag)
        // $(document).on('rangeslider:show', this.showRangeSlider)
       // $(document).on('rangeslider:hide', this.hideRangeSlider)
    }

    init = ()=> {
        this.initVideoJS()
        this.initMarkers()
        // this.initSlider()
    }

    // componentDidUpdate = (prevProps)=> {
    //     if (this.video && !this.video.markers && !this.video.rangeslider){
    //         this.disposeVideoJS();
    //         this.init()
    //     }
    //
    //     if (this.video)
    //         this.updatePlayer(prevProps)
    //     if (this.video && this.video.markers)
    //         this.updateMarkers(prevProps)
    //
    //     const prevTag = prevProps.currentTag
    //     const nextTag = this.props.currentTag
    //
    //     if (
    //         (prevTag.time !== nextTag.time)
    //         || (prevTag.stopTime !== nextTag.stopTime)
    //     ){
    //         if (this.video.paused())
    //             this.video.play()
    //         this.video.setValueSlider(nextTag.time, nextTag.stopTime)
    //         this.video.currentTime(nextTag.time)
    //     }
    //
    // }

    // componentWillUnmount = ()=> {
    //     // $(document).off('create:new-tag', this.createNewTag)
    //     // $(document).off('rangeslider:show', this.showRangeSlider)
    //     // $(document).off('rangeslider:hide', this.hideRangeSlider)
    //     // this.disposeVideoJS();
    // }

    // showRangeSlider = ()=> {
    //     this.video.showSlider()
    // }
    //
    // hideRangeSlider = ()=> {
    //     this.video.hideSlider()
    // }
    //
    // disposeVideoJS = ()=> {
    //     if (this.video){
    //         this.video.off('sliderchange', this.handleSliderChange)
    //         this.video.dispose()
    //     }
    // }

    // handleSliderChange = ()=> {
    //     const value = this.video.getValueSlider();
    //     // console.log('slider changed:', value)
    //     this.props.setTagRange(value.start, value.end)
    // }

    // initSlider = ()=> {
    //     debug('Init Slider')
    //     this.video.rangeslider()
    //     // return new Promise((resolve, reject)=> {
    //     // 	this.video.on('loadedRangeSlider', ()=> {
    //     // 		debug('Slider Ready')
    //     // 		resolve();
    //     // 	})
    //     // })
    // }

    // createNewTag = (e, cb = false)=> {
    //     if (this.video.paused()){
    //         alert('Cannot add tag while video is paused')
    //         return
    //     }
    //     this.video.showSlider()
    //     const time = this.video.currentTime()
    //     const stopTime = time + 1
    //     this.props.createNewTag({
    //         time, stopTime
    //     })
    //     this.video.pause()
    //     // Execute callback if present
    //     if (typeof cb === "function"){
    //         cb();
    //     }
    //
    // }

    initVideoJS = ()=> {
        debug('Init VideoJS')
        const options = {
            fluid: true,
            preload: false,
            autoplay: false,
            controls: true,
            aspectRatio: "16:9"
        }

        const sliderOptions = {hidden:true}
        player = this.video = videojs(this.video_el, options)
        player.markers({
            markerStyle: {},
            markers: this.state.marker_store,
            //markers:this.state.tags,
            onMarkerReached: function () {
                // player.pause();
            },
        });

    }

    initMarkers = ()=> {
        // if (!this.video || !this.video.markers)
        //     return
        // const markers = this.props.tags.map(x => {
        //     return {
        //         time: x.time,
        //         stopTime: x.stopTime,
        //         text: x.category,
        //         overlayText: x.tagname
        //     }
        // })
       // debug(`Added ${markers.length} markers`)

    }
    //
    //
    //
    // updateMarkers = ()=> {
    //     if ( !this.video  || !this.video.markers )
    //         return
    //
    //     const newMarkers = this.props.tags.map(x => x)
    //
    //     if (typeof this.video.markers.reset === "function"){
    //         this.video.markers.reset(newMarkers)
    //         return
    //     }
    //
    //     setTimeout( ()=> {
    //         console.log('reset marker with timeout')
    //         this.video.markers.reset(newMarkers)
    //     }, 300)
    //
    // }
    //
    // updatePlayer = (prevProps)=> {
    //     const prev = prevProps.current  && prevProps.current.video
    //     const next = this.props.current && this.props.current.video
    //
    //     if (!next || !next.file){
    //         this.video.src('')
    //         return
    //     }
    //     if (prev.file !== next.file){
    //         this.video.src(next.file)
    //     }
    // }

    render(){
        const {current, currentTag} = this.props;
        const video = current ? current.video : {}
        const src = video.file || ''
        const poster = video.poster && video.poster.full_size
        // debug('Current Video: ', current)
        //

        return (
            <div className='video-player'>
                <div className='video-player-inner'>
                    <video
                        className='video-js video-el vjs-big-play-centered vjs-default-skin'
                        id='video-el'
                        ref={node=> this.video_el = node}
                       // src='http://techslides.com/demos/sample-videos/small.mp4'
                        src={this.props. video_file_selected_reducer.url}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> ({
    video_file_selected_reducer:state.VideoFileSelectedReducer,
    marker_store:state.markerReducer
})



export default connect(mapStateToProps)(TestVideoPlayer)