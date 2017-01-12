import React, {Component} from 'react'
import {Router, Route, browserHistory, IndexRoute} from "react-router"
require("./login.css")
import valueLink from 'valuelink'
import 'whatwg-fetch'
import $ from 'jquery'

export default class LogInComponent extends Component {
    handleLoginButtonClick() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://trigger-backend.appspot.com/auth/login/",
            "method": "POST",
            "credentials": 'include',
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
            },
            "data": {
                "password": "apurv",
                "username": "Apurv"
            },
            success: function( data, textStatus, jQxhr ){
               alert("success");
            },
        }

        $.ajax(settings).done(function () {
            alert("success");
        });
        // var payload = {
        //     "password":"Apurv",
        //     "username": "Apurv"
        // };
        // console.log(JSON.stringify( payload ) );
        //
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
         browserHistory.push("app")
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
                        <button onClick={this.handleLoginButtonClick}>login</button>
                    </div>
                </div>
                <img className="Logo_Tessact_White" src="./dev/js/images/TESSACT_logo_white.png"/>
            </div>
        );
    }
}