import React, {Component, PropTypes} from 'react'
require("./login.css")
import valueLink from 'valuelink'
import 'whatwg-fetch'
import $ from 'jquery'

export default class LogInComponent extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }
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

        $.ajax(settings).done((response) => {
            alert(response.auth_token);
            console.log('check');
            this.context.router.push('/app')
        });

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
                <img className="Logo_Tessact_White" src="./dev/js/images/TESSACT_logo_white.png"/>
            </div>
        );
    }
}