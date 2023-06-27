import React, { Component } from "react";
import * as firebase from 'firebase'
import { Placeholder } from './uiElements'
import { isNull } from "util";

//TODO: combine reg, login, and forgot password.

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            error: null,
            isSignInOrRegister: true,
            currentlyLoggingIn: false,
            currentAction: 'log',
            appUser: '',
            appPass: ''
        }
        this.recordFormInfo = this.recordFormInfo.bind(this);
        this.handleAccount = this.handleAccount.bind(this);
        this.switchAction = this.switchAction.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    recordFormInfo(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    showForgotAccount() {

    }
    switchAction(e) {
        this.setState({
            currentAction: e.target.dataset.currentaction
        })
    }
    displayError(e) {
        console.log(e.message)
        this.setState({
            error: e.message,
        })
    } 
    handleAccount(e) {
        e.preventDefault();
        var context = this;
        var currentAction = this.state.currentAction;
        console.log("Current Action: " + currentAction)
        if (this.state.appUser !== "" && this.state.appPass !== "") {
            if (currentAction === "reg") {
                //action is sign up
                firebase.auth().createUserWithEmailAndPassword(this.state.appUser, this.state.appPass).catch(e => this.displayError(e))
            } else if (currentAction === "log") {
                //action is log in
                firebase.auth().signInWithEmailAndPassword(this.state.appUser, this.state.appPass).catch(e => this.displayError(e))
            } else if (currentAction === "fpw") {
                //action is forgot password
                firebase.auth().sendPasswordResetEmail(this.state.appUser).catch(e => this.displayError(e));
            }
        }
        else {
            context.setState({
                error: 'Both fields must be non-empty',

            })
        }
    }
    render() {
        return (
            <div id="accountChunk">
                <Placeholder loaded={this.props.finishedLoading}>
                    <div id="signInForm">
                        <form onSubmit={this.handleAccount}>
                            <h1>Sign In to Chatty</h1>
                            {!isNull(this.state.error) && <span>{this.state.error}</span>}
                            <input placeholder='Email Address' type="email" onChange={this.recordFormInfo} name="appUser" />
                            {this.state.isSignInOrRegister  && <input placeholder='Password' type="password" onChange={this.recordFormInfo} name="appPass" />}
                            <Placeholder loaded={!this.state.currentlyLoggingIn}>
                                <input id="login-button" type="submit" data-currentaction="log" onClick={this.switchAction} value="Sign In"></input>
                                <input id="reg-button" type='button' data-currentaction="reg" onClick={this.switchAction} value="I don't have an account" />
                                <input id="fpw-button" type="button" data-currentaction="fpw" onClick={this.switchAction} value="Forgot Password" />
                            </Placeholder>
                        </form>
                    </div>
                </Placeholder>
            </div>
        )
    }
}
export default LoginPage;