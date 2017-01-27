import React, {Component, PropTypes} from 'react'
require("./login.css")
import valueLink from 'valuelink'
import 'whatwg-fetch'
import $ from 'jquery'
import {actions} from '../../store/Data'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {tokenAction} from '../../store/tokenAction'


class LogInComponent extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    handleLoginButtonClick() {
        var that = this;
        let token;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://trigger.eastus.cloudapp.azure.com/auth/login/",
            "method": "POST",
            "credentials": 'include',
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
            },
            "data": {
                "password": document.getElementById("password").value,
                "username": document.getElementById("username").value
            },
            success:( response, textStatus, jQxhr )=> {
                this.props.tokenAction(response.auth_token);
            }
        }

        $.ajax(settings).done((response) => {
            //alert(response.auth_token);
            token = response.auth_token
            //that.props.setAuthToken(token);
            console.log(token);
            this.context.router.push('/app')
        });

        console.log(document.getElementById("password").value);

        // var payload = {
        //     "password":"Apurv",
        //     "username": "Apurv"
        // };
        // console.log(JSON.stringify( payload ) );
        // console.log("test");
        // fetch('https://trigger-backend.appspot.com/auth/login/', {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //         },
        //         body: payload
        //     }
        // )
        //     .then(function(res){ return res.json(); })
        //     .then(function(data){ alert( JSON.stringify( data ) ) })


        //     .then(function(response) {
        //     return response.json();
        // })
        //     .then(function(data) {
        //         // We get a JWT back.
        //         let jwt = data.auth_token;
        //         // We trigger the LoginAction with that JWT.
        //         console.log(data);
        //         //LoginActions.loginUser(jwt);
        //         return data;
        //     })

        //     .catch(function(error) {
        //     console.log('There has been a problem with your fetch operation: ' + error.message);
        // });
        //this.props.history.push('app');
        // console.log('clicked')
        // console.log(document.getElementById("password").value);

    }


    render(){
        return (
            <div className="LoginPage">
                <div className="login-page">
                    <div className="form">
                        <form className="login-form">
                            <input id="username" type="username" placeholder="username"/>
                            <input id="password" type="password" placeholder="password"/>
                            <p className="message">Not registered? <a href="#">Request Username and Password</a></p>
                        </form>
                        <button onClick={this.handleLoginButtonClick.bind(this)}>login</button>
                    </div>
                </div>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({tokenAction: tokenAction}, dispatch);
}

export default connect(null, matchDispatchToProps)(LogInComponent);