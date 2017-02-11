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

    var markerJson;
    var values,x;
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
                    that.setState({tags: response})
                    x = response;
                    that.props.tagFetchedAction(response);
                    console.log(that.state.tags)
                    console.log(this.props.marker_store)
                }
            }

            $.ajax(settings).done((response) => {
                //alert(response.auth_token);
                //that.props.setAuthToken(token);
                //this.context.router.push('/app')
            });
        }
        componentDidMount() {
            var self = this;
            var options ={hidden:true};
            var player = videojs(this.refs.video, this.props.options).ready(function () {
                self.player = this;
                self.player.on('play', self.handlePlay);
            });
            player.rangeslider(options);
            player.on("sliderchange",()=> {
                values = player.getValueSlider();
                console.log(values)
                this.props.newMarkerTimeAction(values)
            });

            // $.get('URL-TO-FETCH-DATA-FROM', function(result) {
            //     if (this.isMounted()) {
            //         this.setState({
            //             dataVar1: result
            //         });
            //     }
            // }.bind(this));

            if (this.props.onPlayerInit) this.props.onPlayerInit(player);


            player.markers({
                markerStyle: {},
                markers: this.state.tags,
                //markers:this.state.tags,
                onMarkerReached: function () {
                    // player.pause();
                },
            });
            this.setState({player: player});

        }

        jumpToSpecificMarker() {
            var index = this.props.tag_selected_reducer.ind;
            this.state.player.markers.jumpToSpecificMarker(index);
        }
        getTimeValue() {
            //console.log(this.state.player.getValueSlider());
        }

        handlePlay() {
            console.log("handle play ")}


        showSlider(){
            this.state.player.showSlider();
            this.state.player.pause();
        }

        hideSlider() {
            this.state.player.hideSlider();
        }




            render()
            {
                var props = blacklist(this.props, 'children', 'className', 'src', 'type', 'onPlay');
                props.className = cx(this.props.className, 'videojs', 'video-js vjs-default-skin', 'vjs-big-play-centered');

                assign(props, {
                    ref: 'video',
                    controls: true,
                    width:"940",
                    height:"490"
                });

                if (this.props.tag_selected_reducer.flag) {
                    this.jumpToSpecificMarker();
                }

                if (this.props.new_marker_reducer.flag) {
                    this.showSlider();
                }

                // if (!this.props.new_marker_reducer.flag) {
                //     this.hideSlider();
                // }





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
    return bindActionCreators({newMarkerTimeAction: newMarkerTimeAction, tagFetchedAction:tagFetchedAction}, dispatch);
}
    export default connect(mapStateToProps, matchDispatchToProps)(Player);