import assign from 'object-assign'
import cx from 'classnames'
import blacklist from 'blacklist'
import React, {Component} from 'react'
    // import {tagSelected} from '../../actions/tagSelected'
import {connect} from 'react-redux';
import $ from 'jquery'
import {bindActionCreators} from 'redux';
import {newMarkerTimeAction} from '../../store/newMarkerTimeAction'
import {tagFetchedAction} from '../../store/tagFetchedAction'
import {markerReachedAction} from '../../store/markerReachedAction'

    var markerJson, player, currentTime, ind;
var values;
var lastNotifiedIndex = -1;
    class Player extends Component {
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

        componentWillMount(){
            var that = this;

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://www.backend.trigger.tessact.com/api/v1/videos/"+ this.props. video_file_selected_reducer.id +"/frame_tags/",
                "method": "GET",
                "headers": {
                    Authorization: "Token " + that.props.token_Reducer.token
                },
                success:( response, textStatus, jQxhr )=> {
                    that.props.tagFetchedAction(response);
                    //console.log(that.state.tags)
                }
            }

            $.ajax(settings).done((response) => {
                //alert(response.auth_token);
                //that.props.setAuthToken(token);
                that.setState({tags: response})
                //console.log(that.state.tags)
                //this.context.router.push('/app')
                var self = this;
                var options ={hidden:true};
                player = videojs(this.refs.video, this.props.options).ready(function () {
                    self.player = this;
                    self.player.on('play', self.handlePlay);
                });
                player.rangeslider(options);
                player.hideControlTime();
                player.on("sliderchange",()=> {
                    values = player.getValueSlider();
                    //console.log(values)
                    this.props.newMarkerTimeAction(values)
                });
                player.on("timeupdate", ()=> {
                    currentTime = player.currentTime();
                    //console.log(currentTime)
                });
                // setInterval(function () {
                //     that.state.tags.map((item, i) => {
                //         if( item.time <= currentTime && currentTime <= item.stopTime){
                //             if (lastNotifiedIndex != i) {
                //                 // Yes, notify
                //                 lastNotifiedIndex = i;
                //                // console.log(lastNotifiedIndex)
                //                 that.props.markerReachedAction(lastNotifiedIndex);
                //             }
                //             //console.log(i);
                //         }
                //     }) , 500
                // })

                // setInterval(function() {
                //     // Find the index for which our predicate function returns true
                //     const index = that.state.tags.findIndex(item => item.time < currentTime && currentTime < item.stopTime);
                //     // If we found one, is it different?
                //     //console.log(index)
                //     //console.log(that.state.tags[index].time)
                //     // if( that.state.tags[index].time <= currentTime && currentTime <= that.state.tags[index].stopTime){
                //     //     if (index !== -1 && lastNotifiedIndex !== index) {
                //     //         // Yes, notify
                //     //         lastNotifiedIndex = index;
                //     //     }
                //     // }
                //     if (lastNotifiedIndex !== index) {
                //         // Yes, notify
                //         lastNotifiedIndex = index;
                //         that.props.markerReachedAction(lastNotifiedIndex);
                //     }
                //
                //     console.log(lastNotifiedIndex)
                //
                // }, 500);


                if (this.props.onPlayerInit) this.props.onPlayerInit(player);


                console.log(player.currentTime())
                player.markers({
                    markerStyle: {},
                    markers: this.state.tags,
                    //markers:this.state.tags,
                    onMarkerReached: function () {
                        // player.pause();
                    },
                });
                this.setState({player: player});
                this.state.player.markers.getVideoDuration(this.props.video_file_selected_reducer.videoDuration);


            });

        }
        componentDidMount() {
        }
        componentWillUnmount() {
            console.log('Will Unmount');
            lastNotifiedIndex = -1;
        }

        jumpToSpecificMarker() {
            var index = this.props.tag_selected_reducer.ind;
            this.state.player.markers.jumpToSpecificMarker(index);
        }
        getTimeValue() {
            //console.log(this.state.player.getValueSlider());
        }

        handlePlay() {
            console.log("handle play ")
            console.log("hii" + player.getChild('ControlBar').getChild('ProgressControl').currentWidth())
            console.log(player.currentTime())
        }


        showSlider(){
            this.state.player.setValueSlider(this.props.new_marker_reducer.start, this.props.new_marker_reducer.end);
            this.state.player.showSlider();
            this.state.player.pause();
        }

        hideSlider() {
            this.state.player.hideSlider();
        }

        updateTagInTable(){
            // console.log(this.state.tags)
            this.state.tags.map((item, i) => {
                if( item.time <= currentTime   && currentTime <= item.stopTime){
                    this.props.markerReachedAction(i);
                    console.log(i);
                }
            })
        }


            render()
            {
                var props = blacklist(this.props, 'children', 'className', 'src', 'type', 'onPlay');
                props.className = cx(this.props.className, 'videojs', 'video-js vjs-default-skin', 'vjs-big-play-centered');

                assign(props, {
                    ref: 'video',
                    controls: true,
                    width:"860",  //860 earlier
                    height:"490"
                });

                //setInterval(this.updateTagInTable, 500)
                //this.updateTagInTable();

                if (this.props.tag_selected_reducer.flag) {
                    this.jumpToSpecificMarker();
                    this.state.player.pause();
                }

                if (this.props.new_marker_reducer.flag) {
                    this.showSlider();
                }

                if (!this.props.new_marker_reducer.flag_2) {
                    this.hideSlider();
                }

                return (
                    <div>
                        <video ref='video' {... props} data-setup='{ "inactivityTimeout": 0 }'>
                            <source src={this.props. video_file_selected_reducer.url} type="video/mp4"/>
                        </video>
                        {/*<button onClick={this.jumpToSpecificMarker.bind(this)}>next</button>*/}
                            {/*<button onClick={this.hideSlider.bind(this)}>prev</button>*/}
                    </div>)


        }
    }
    const mapStateToProps = (state) => {
        return {
            // tags: state.tagReducer,
            marker_store:state.markerReducer,
            token_Reducer: state.tokenReducer,
            tag_selected_reducer: state.tagSelectedReducer,
            new_marker_reducer: state.newMarkerReducer,
            video_file_selected_reducer:state.VideoFileSelectedReducer,
            // card_Reducer: state.cardReducer,
            // tag_brief_Reducer:state.tagBriefReducer,
            // marker_store_cigarette:state.markerStoreCigarette
        };
    };


function matchDispatchToProps(dispatch) {
    return bindActionCreators({newMarkerTimeAction: newMarkerTimeAction, tagFetchedAction:tagFetchedAction, markerReachedAction: markerReachedAction}, dispatch);
}
    export default connect(mapStateToProps, matchDispatchToProps)(Player);