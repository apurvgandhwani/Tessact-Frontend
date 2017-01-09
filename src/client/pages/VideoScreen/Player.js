var ReactDOM = require('react-dom');
var Video = require('./PlayerLogic');
import PlayerLogic from './PlayerLogic';
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


const styles = {
    fontStyle: {
        fontSize: 22,
        fontWeight: 400,
        fontFamily: 'Roboto, sans-serif'

    },
};
var markerJson = [];
export default class Player extends Component {

    // componentDidMount(){
    //     $.get('URL-TO-FETCH-DATA-FROM', function(result) {
    //         if (this.isMounted()) {
    //             markerJson = [result];
    //         }
    //     }.bind(this));
    // }
    componentDidMount(){
        console.log("wow" +this.props.cards.video_url);
    }
    render() {
        return (
            <div>
                <div className="playerDiv">
                    <PlayerLogic
                        id="myvideo"
                     // src="./dev/js/components/VideoPlayer/CarChase.mp4"
                        src={this.props.cards.video_url}
                        type="video/mp4"
                        onPlay={this.handlePlay}
                    />
                </div>
            </div>


        );
    }

};

// const mapStateToProps = (state) => {
//     return {
//         cards: state.cardReducer
//     };
// };
//
// export default connect(mapStateToProps)(Player);