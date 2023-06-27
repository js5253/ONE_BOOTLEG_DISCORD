import React, { Component } from "react";
import * as firebase from 'firebase';
import { Carousel, Placeholder, Dialog } from "./uiElements";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind();
        this.storeData = this.storeData.bind(this);
        this.setAccountPreferences = this.setAccountPreferences.bind(this);
        this.handlePasswordReset = this.handlePasswordReset.bind(this);
        this.togglePasswordChangeBox = this.togglePasswordChangeBox.bind(this);
        this.state = {
            themeStoreThemes: null,
            finishedLoadingStore: false,
            passwordChangeBoxOpened: false,
            newPassword: '',
            confNewPassword: '',
            originalPassword: ''
        }
    }
    componentWillMount() {
        var react = this;
        var themes = firebase.database().ref('themes/').once('value').then(function (snapshot) {
            react.setState({
                themeStoreThemes: snapshot.val(),
                finishedLoadingStore: true
            });
        }).catch(function(error) {
            alert(error)
        });

    }
    togglePasswordChangeBox() {
        this.setState({
            passwordChangeBoxOpened: !this.state.passwordChangeBoxOpened
        })

    }
    handlePasswordReset(e) {
        console.log(
            this.state.originalPassword,
            this.state.newPassword,
            this.state.confNewPassword
        )
        e.preventDefault();
        var react = this;
        if (this.state.confNewPassword === this.state.newPassword && this.state.confNewPassword !== "" && this.state.newPassword !== "") {
            var user = firebase.auth().currentUser;
            var credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                this.state.originalPassword
            )
            user.reauthenticateWithCredential(credential).then(
                function () {
                    firebase.auth().currentUser.updatePassword(
                        react.state.newPassword
                    )
                    react.setState({
                        passwordChangeBoxOpened: false
                    })
                }
            ).catch(function (reason) {
                console.log(reason)
            })
        } else {
            this.setState({
                error: "All fields need to be non-empty, and the new password must be equal to the confirmation."
            });
        }

    }
    storeData(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    setAccountPreferences(e) {
        e.preventDefault();
        var emailAddress = this.state.emailAddress;
        var name = this.state.name;
    }
    handleSignOut() {
        firebase.auth().signOut();
    }
    render() {
        return (
            <div id="themesChunk">
            <Dialog visible={this.state.passwordChangeBoxOpened} closeAction={this.togglePasswordChangeBox} title="Change Password">
            <span className="error">{this.state.error}</span>
                    <form method="post" onSubmit={this.handlePasswordReset}>
                        <label htmlFor="originalPassword">Current Password</label>
                        <input type="password" name="originalPassword" onChange={this.storeData} />
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" name="newPassword" onChange={this.storeData} />
                        <label htmlFor="confNewPassword">Confirm New Password</label>
                        <input type="password" name="confNewPassword" onChange={this.storeData} />
                        <input type="submit" value="Change Password" />
                    </form>
            </Dialog>
                <nav className="pageIndex">
                    <ul>
                        <li><a href="#account">Account</a></li>
                        <li><a href="#themes">Themes</a></li>
                    </ul>
                </nav>
                <section id="account">
                    <h3>Account</h3>
                    <form method="post" onSubmit={this.setAccountPreferences}>
                        <label htmlFor="nameBox">Name</label><input name="nameBox" placeholder="John" onChange={this.storeData} />
                        <label htmlFor="emailBox">Email Address</label><input onChange={this.storeData} name="emailBox" placeholder="me@example.com" />
                        <input type="submit" value="Apply changes" />
                        <input type="button" onClick={this.togglePasswordChangeBoxs} value="Change Password" />
                    </form>
                </section>
                <section id="themes">
                    <h3>Themes</h3>
                    <div id="myThemes">
                        <h4>My Themes</h4>
                        <Placeholder loaded={false} customLabel="Getting your themes" />
                    </div>
                    <div id="themeStore">
                        <h4>Theme store</h4>
                        <Placeholder loaded={this.state.finishedLoadingStore} customLabel="Getting themes">{console.log(this.state.themeStoreThemes)}</Placeholder>
                    </div>
                </section>
            </div>
        )
    }
}

export default Settings;