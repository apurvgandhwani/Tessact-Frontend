import assign from 'object-assign'
import cx from 'classnames'
import blacklist from 'blacklist'
import React, {Component} from 'react'
    // import {tagSelected} from '../../actions/tagSelected'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery'
import videoSrc from './CarChase.mp4';


    var markerJson;
    class Player extends Component {
        constructor() {
            super();
            this.state = {
                player: {},
                tags:[]
            };
        }

        componentWillMount(){
            var that = this;
            let token;
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://trigger.eastus.cloudapp.azure.com/api/v1/videos/a6eb980c-7d3b-41c4-ac39-622e0e071722/frame_tags/",
                "method": "GET",
                "headers": {
                    Authorization: "Token " + that.props.token_Reducer.token
                },
                success:( response, textStatus, jQxhr )=> {
                    that.setState({tags: response})
                    console.log(that.state.tags)
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
            var options ={hidden:false};
            var player = videojs(this.refs.video, this.props.options).ready(function () {
                self.player = this;
                self.player.on('play', self.handlePlay);
            });
            //player.rangeslider(options);

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
                markers: this.props.marker_store,
                //markers:this.state.tags,
                onMarkerReached: function () {
                    // player.pause();
                },
            });
            this.setState({player: player});

        }


        handlePlay() {
            console.log("handle play ")

        }
            render()
            {
                var props = blacklist(this.props, 'children', 'className', 'src', 'type', 'onPlay');
                props.className = cx(this.props.className, 'videojs', 'video-js vjs-default-skin', 'vjs-big-play-centered');

                assign(props, {
                    ref: 'video',
                    controls: true,
                    width:"1200",
                    height:"600"
                });

                return (
                    <div>
                        <video ref='video' {... props}>
                            <source src={videoSrc} type="video/mp4"/>
                        </video>

                        {/*<button onClick={this.jumpToSpecificMarker.bind(this)}>next</button>*/}
                        {/*<button onClick={this.prev.bind(this)}>prev</button>*/}
                    </div>)


        }
    }
    const mapStateToProps = (state) => {
        return {
            // tags: state.tagReducer,
            marker_store:state.markerReducer,
            token_Reducer: state.tokenReducer            // card_Reducer: state.cardReducer,
            // tag_brief_Reducer:state.tagBriefReducer,
            // marker_store_cigarette:state.markerStoreCigarette
        };
    };

    export default connect(mapStateToProps)(Player);