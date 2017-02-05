import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import React, {Component, PropTypes} from 'react';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {addButtonClickedAction} from '../../store/addButtonClickedAction'
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

const styles = {
    fontStyle: {
        fontSize: 16,
        paddingLeft: 8,
        fontWeight: 400,
        lineHeight: 0.5,
        fontFamily: 'Roboto, sans-serif'
    },
    headingline: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: 400,
        fontFamily: 'Roboto, sans-serif'
    }
};

var tagName
class AddTags extends Component {

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
                Authorization: "Token " + that.props.token_Reducer.token
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

    clicked= ()=> {
        this.props.addButtonClickedAction(false);
        this.context.router.push('/TagList')
    };

    onAppendClicked = () => {
        console.log("hi")
        let that = this;
        //here the logic for appending tags goes
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://trigger.eastus.cloudapp.azure.com/api/v1/frame_tags/",
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
            <div className="add-container">
                <div className="time-from-container">
                    <h4 style={styles.fontStyle} className="timeStamp">From : </h4>
                    <TextField
                        id="time_in"
                        className="timeStamp"
                        underlineFocusStyle={{borderColor: '#293C8E'}}
                        floatingLabelFocusStyle={{color: '#293C8E'}}
                        style={{width: 120}}
                        value={this.props.new_marker_reducer.start}
                        floatingLabelText="Start Time"
                    />
                </div>
                <div className="time-to-container">
                    <h4 style={styles.fontStyle} className="timeStamp1">To :</h4>
                    <TextField
                        id="time_out"
                        className="timeStamp2"
                        underlineFocusStyle={{borderColor: '#293C8E'}}
                        floatingLabelFocusStyle={{color: '#293C8E'}}
                        style={{width: 120}}
                        value={this.props.new_marker_reducer.end}
                        floatingLabelText="End Time"
                    />
                </div>
                <div className="selectfield-container">
                    <div className="globalTags">
                        <h4 style={styles.fontStyle} className="global">Global Tag :</h4>
                        <SelectField style={{className: "global"}} value={this.state.global_value}
                                     onChange={this.handleGlobalChange} maxHeight={150}>
                            {populateGlobalTag}
                        </SelectField>
                    </div>
                    <div className="globalTags">
                        <h4 style={styles.fontStyle} className="local" classID="">Local Tag :</h4>
                        <SelectField style={{className: "local", classID: "local"}} value={this.state.local_value}
                                     onChange={this.handleLocalChange} maxHeight={150}>
                            {populateLocalTag}
                        </SelectField>
                    </div>
                </div>
                <div className="button-container">
                    <RaisedButton className="addTagDone" primary={false} backgroundColor="#D3D3D3" label="Done"
                                  labelColor="#000000" onClick={this.clicked}/>

                    <RaisedButton className="appendTag" backgroundColor="#D3D3D3" label="Append" labelColor="#000000"
                                  onClick={this.onAppendClicked}/>
                </div>

            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        new_marker_reducer: state.newMarkerReducer,
        token_Reducer: state.tokenReducer,
    };
};
function matchDispatchToProps(dispatch) {
    return bindActionCreators({addButtonClickedAction: addButtonClickedAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddTags);