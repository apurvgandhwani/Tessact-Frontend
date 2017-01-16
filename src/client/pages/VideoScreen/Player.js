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
export default class Player extends Component {
    constructor() {
        super();
        this.state = {
            player: {}
        };
    }

    componentDidMount() {
        var self = this;
        var player = videojs(this.refs.video, this.props.options).ready(function () {
            self.player = this;
            self.player.on('play', self.handlePlay);
        });

        // $.get('URL-TO-FETCH-DATA-FROM', function(result) {
        //     if (this.isMounted()) {
        //         this.setState({
        //             dataVar1: result
        //         });
        //     }
        // }.bind(this));

        if (this.props.onPlayerInit) this.props.onPlayerInit(player);



     /*  player.markers({
            markerStyle: {},
            markers: [
                {
                    "text": "motorcycle",
                    "stopTime": 47.96944109368717,
                    "time": 47.56735022114998
                },
                {
                    "text": "motorcycle",
                    "stopTime": 48.41174105347808,
                    "time": 48.00965018094089
                },
                {
                    "text": "motorcycle",
                    "stopTime": 48.854041013269,
                    "time": 48.4519501407318
                },
                {
                    "text": "car",
                    "stopTime": 115.19903498190591,
                    "time": 114.79694410936871
                },
                {
                    "text": "car",
                    "stopTime": 115.64133494169683,
                    "time": 115.23924406915962
                },
                {
                    "text": "car",
                    "stopTime": 116.08363490148773,
                    "time": 115.68154402895054
                },
                {
                    "text": "car",
                    "stopTime": 116.52593486127864,
                    "time": 116.12384398874146
                },
                {
                    "text": "car",
                    "stopTime": 116.96823482106956,
                    "time": 116.56614394853236
                },
                {
                    "text": "car",
                    "stopTime": 117.41053478086047,
                    "time": 117.00844390832327
                },
                {
                    "text": "car",
                    "stopTime": 117.85283474065139,
                    "time": 117.45074386811419
                },
                {
                    "text": "car",
                    "stopTime": 118.29513470044229,
                    "time": 117.8930438279051
                },
                {
                    "text": "car",
                    "stopTime": 118.7374346602332,
                    "time": 118.33534378769602
                },
                {
                    "text": "car",
                    "stopTime": 119.17973462002412,
                    "time": 118.77764374748693
                },
                {
                    "text": "car",
                    "stopTime": 119.62203457981504,
                    "time": 119.21994370727784
                },
                {
                    "text": "car",
                    "stopTime": 120.06433453960595,
                    "time": 119.66224366706875
                },
                {
                    "text": "car",
                    "stopTime": 120.50663449939685,
                    "time": 120.10454362685967
                }
                ]
            ,
            onMarkerReached: function () {
                // player.pause();
            },
        }); */  //Dhoom


        // actual code opens
        // switch (this.props.card_Reducer.content_name) {
        //     case "Fast and Furious":
        //         markerJson = this.props.marker_store;
        //         break;
        //     case "Rustom":
        //         markerJson = this.props.marker_store1;
        //         break;
        //     case "Dhoom 3":
        //         markerJson = this.props.marker_store2;
        //         break;
        //     case "Raman Raghav":
        //         markerJson = this.props.marker_store_cigarette;
        //         break;
        //     default:
        //         markerJson = this.props.marker_store2;
        // }
        //actual code closes

        // switch (this.props.tag_brief_Reducer.id) {
        //     case 1:
        //         markerJson = this.props.marker_store;
        //         break;
        //     case 2:
        //         markerJson = this.props.marker_store1;
        //         break;
        //     case 3:
        //         markerJson = this.props.marker_store2;
        //         break;
        //     case 4:
        //         markerJson = this.props.marker_store2;
        //         break;
        //     default:
        //         markerJson = this.props.marker_store2;
        // }


     // if(this.props.card_Reducer.card_id = 1){
     //     markerJson = this.props.markers_store
     //    }
     //    if (this.props.card_Reducer.card_id = 2) {
     //        markerJson = this.props.markers_store1
     //    }
     //    if (this.props.card_Reducer.card_id = 3){
     //        markerJson = this.props.markers_store2
     //    }
      /*  player.markers({
            markerStyle:{},
            markers: [
                {
                    "time": 0.7089241034195163,
                    "stopTime": 1.1259382819015846,
                    "text": "Car"
                },
                {
                    "time": 1.1676396997497915,
                    "stopTime": 1.5846538782318598,
                    "text": "Car"
                },
                {
                    "time": 1.6263552960800667,
                    "stopTime": 2.043369474562135,
                    "text": "Car"
                },
                {
                    "time": 2.085070892410342,
                    "stopTime": 2.5020850708924103,
                    "text": "Car"
                },
                {
                    "time": 2.543786488740617,
                    "stopTime": 2.9608006672226854,
                    "text": "Car"
                },
                {
                    "time": 3.0025020850708923,
                    "stopTime": 3.4195162635529606,
                    "text": "Car"
                },
                {
                    "time": 3.4612176814011675,
                    "stopTime": 3.878231859883236,
                    "text": "Car"
                },
                {
                    "time": 3.9199332777314426,
                    "stopTime": 4.336947456213511,
                    "text": "Car"
                },
                {
                    "time": 4.378648874061718,
                    "stopTime": 4.795663052543786,
                    "text": "Car"
                },
                {
                    "time": 5.2960800667222685,
                    "stopTime": 5.713094245204337,
                    "text": "Car"
                },
                {
                    "time": 11.718098415346121,
                    "stopTime": 12.13511259382819,
                    "text": "Car"
                },
                {
                    "time": 12.176814011676397,
                    "stopTime": 12.593828190158465,
                    "text": "Car"
                },
                {
                    "time": 12.635529608006673,
                    "stopTime": 13.05254378648874,
                    "text": "Car"
                },
                {
                    "time": 14.929107589658049,
                    "stopTime": 15.346121768140117,
                    "text": "Car"
                },
                {
                    "time": 22.26855713094245,
                    "stopTime": 22.68557130942452,
                    "text": "Car"
                },
                {
                    "time": 22.727272727272727,
                    "stopTime": 23.144286905754797,
                    "text": "Car"
                },
                {
                    "time": 23.185988323603002,
                    "stopTime": 23.603002502085072,
                    "text": "Car"
                },
                {
                    "time": 51.626355296080064,
                    "stopTime": 52.043369474562134,
                    "text": "Car"
                },
                {
                    "time": 52.08507089241034,
                    "stopTime": 52.50208507089241,
                    "text": "Car"
                },
                {
                    "time": 52.543786488740615,
                    "stopTime": 52.960800667222685,
                    "text": "Car"
                },
                {
                    "time": 53.919933277731445,
                    "stopTime": 54.33694745621351,
                    "text": "Car"
                },
                {
                    "time": 54.37864887406172,
                    "stopTime": 54.79566305254379,
                    "text": "Car"
                },
                {
                    "time": 57.58965804837364,
                    "stopTime": 58.00667222685571,
                    "text": "Car"
                },
                {
                    "time": 58.965804837364466,
                    "stopTime": 59.382819015846536,
                    "text": "Car"
                },
                {
                    "time": 59.88323603002502,
                    "stopTime": 60.30025020850709,
                    "text": "Car"
                },
                {
                    "time": 80.98415346121767,
                    "stopTime": 81.40116763969975,
                    "text": "Car"
                },
                {
                    "time": 81.44286905754795,
                    "stopTime": 81.85988323603003,
                    "text": "Car"
                },
                {
                    "time": 86.94745621351126,
                    "stopTime": 87.36447039199332,
                    "text": "Car"
                },
                {
                    "time": 109.88323603002502,
                    "stopTime": 110.3002502085071,
                    "text": "Car"
                },
                {
                    "time": 110.3419516263553,
                    "stopTime": 110.75896580483736,
                    "text": "Car"
                },
                {
                    "time": 110.80066722268558,
                    "stopTime": 111.21768140116764,
                    "text": "Car"
                },
                {
                    "time": 111.25938281901584,
                    "stopTime": 111.67639699749792,
                    "text": "Car"
                }
            ]
        }); */

        player.markers({
            markerStyle: {},
            // markers: markerJson,  //temp commented
            markers:[],
            onMarkerReached: function () {
                // player.pause();
            },
        });
        this.setState({player: player});

    }

    // next() {
    //     this.state.player.markers.next();
    //     var index = this.props.tags.ind;
    //     console.log(index);
    //
    // }

    //actual code opens
    // jumpToSpecificMarker() {
    //     var index = this.props.tags.ind;
    //     this.state.player.markers.jumpToSpecificMarker(index);
    // }
    //actual code closes

    // prev() {
    //     this.state.player.markers.prev();
    // }

    handlePlay() {
        console.log("handle play ")

    }

    render() {

        return (
            <div className="video-wrapper">
                <video id="example_video_1" controls="true" className="video-js vjs-default-skin">
                    <source src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
                </video>
            </div>)
    }
}
// const mapStateToProps = (state) => {
//     return {
//         tags: state.tagReducer,
//         marker_store:state.markerStore,
//         marker_store1:state.markerStore1,
//         marker_store2:state.markerStore2,
//         card_Reducer: state.cardReducer,
//         tag_brief_Reducer:state.tagBriefReducer,
//         marker_store_cigarette:state.markerStoreCigarette
//     };
// };

//export default connect(mapStateToProps)(PlayerLogic);