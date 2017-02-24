import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton'
import React, {Component, PropTypes} from 'react';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {doneButtonClickedAction} from '../../store/doneButtonClickedAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery'

const items = [];
for (let i = 0; i < 100; i++) {
    items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`}/>);
}

const tags = {
    global_tags: ["Compliance"],
    local_tags: ["Smoking", "Drinking"]
}


var tagName
class editTag extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    state = {
        tagTypeList: []
    };

    componentWillMount() {
        var that = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/tags/",
            "method": "GET",
            "headers": {
                Authorization: "Token" + that.props.token_Reducer.token
            },
            success: (response, textStatus, jQxhr) => {
                that.setState({tagTypeList: response})
                console.log(that.state.tags)
            }
        }

        $.ajax(settings).done((response) => {
            //alert(response.auth_token);
            //that.props.setAuthToken(token);
            //this.context.router.push('/app')
        });
    }

    constructor(props) {
        super(props);
        this.state = {global_value: 10, local_value: 8};
    }

    handleLocalChange = (event, index, value) => {
        this.setState({local_value: value});
    };
    handleGlobalChange = (event, index, value) => {
        this.setState({global_value: value});
    };

    onDoneClicked = () => {
        console.log(this.props.edit_tag_reducer.time_in)
        this.props.doneButtonClickedAction(false);
        this.context.router.push('/TagList')
    };

    secondsToHms(input, fps) {
        var pad = function (input) {
            return (input < 10) ? "0" + input : input;
        };
        fps = (typeof fps !== 'undefined' ? fps : 24 );
        return [
            pad(Math.floor(input / 3600)),
            pad(Math.floor(input % 3600 / 60)),
            pad(Math.floor(input % 60)),
            pad(Math.floor(input * fps % fps))
        ].join(':');
    }

    onAppendClicked = () => {
        console.log("hi")
        let that = this;
        //here the logic for appending tags goes
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://www.backend.trigger.tessact.com/api/v1/frame_tags/",
            "method": "POST",
            "credentials": 'include',
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token,
                "content-type": "application/x-www-form-urlencoded",
            },
            "data": {
                "tag": "bc3857ad-3cc9-4449-a6ab-e6bd3b9cf886",
                "video": "2ff931f6-f734-4472-9cce-131b0ec40bb9",
                "frame_in": document.getElementById("time_in").value,
                "frame_out": document.getElementById("time_out").value,
                "comment": "Added the tag"
            },
            success: (response, textStatus, jQxhr) => {
                this.props.tokenAction(response.auth_token);
            }
        }

        $.ajax(settings).done((response) => {
            //alert(response.auth_token);
            //token = response.auth_token
            //that.props.setAuthToken(token);
            console.log(token);
            this.context.router.push('/app')
        });

    };

    render() {
        var populateGlobalTag = tags.global_tags.map(function (value, ind) {
            return (
                <MenuItem value={ind} primaryText={value}/>
            );
        });
        var populateLocalTag = tags.local_tags.map(function (value, ind) {
            return (
                <MenuItem value={ind} primaryText={value}/>
            );
        });
        return (

            <div className="flex-vertical">
                <h3 className="add-tag-header">Edit Tag</h3>
                <div className="time-from-container">
                    <h4 className="timeStamp">From </h4>
                    <input
                        id="time_in"
                        type="text"
                        value={this.secondsToHms(this.props.new_marker_reducer.start)}
                    />
                </div>
                <div className="time-to-container">
                    <h4 className="timeStamp1">To</h4>
                    <input
                        id="time_out"
                        type="text"
                        value={this.secondsToHms(this.props.new_marker_reducer.end)}
                    />
                </div>
                <div className="globalTags">
                    <h4 className="global">Global Tag</h4>
                    <select defaultValue={this.props.edit_tag_reducer.category}>
                        <option>Compliance</option>
                    </select>
                </div>
                <div className="localTags">
                    <h4>Local Tag</h4>
                    <select>
                        <option>Smoking</option>
                        <option>Alcohol</option>
                    </select>
                </div>

                <div className="button-container">
                    <FlatButton style={{borderRadius: 0}} className="appendTag" backgroundColor="#D3D3D3" label="Done" labelColor="#000000"
                                onClick={this.onDoneClicked}/>
                </div>

            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        new_marker_reducer: state.newMarkerReducer,
        token_Reducer: state.tokenReducer,
        edit_tag_reducer:state.editTagReducer,

    };
};
function matchDispatchToProps(dispatch) {
    return bindActionCreators({doneButtonClickedAction: doneButtonClickedAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(editTag);/**
 * Created by root on 2/16/17.
 */
