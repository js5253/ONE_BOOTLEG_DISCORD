import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Navigation from './Navigation';
import './App.css'
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBvlQp4J8Nno1Q38uyiBdHIuCVb4nYgFPs",
    authDomain: "one-chat-61c71.firebaseapp.com",
    databaseURL: "https://one-chat-61c71.firebaseio.com",
    projectId: "one-chat-61c71",
    storageBucket: "one-chat-61c71.appspot.com",
    messagingSenderId: "383001035734"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
class App extends Component {
    componentWillMount() {
        var react = this;
        firebase.app().auth().onAuthStateChanged(function (user) {
            react.setState({
                finishedLoading: true
            })
            if (user) {
                react.setState({
                    loggedIn: true,
                })
            }
        })
    }
    signInOutButtonHandler() {
        this.setState({
            accountActionDialogOpen: !this.state.accountActionDialogOpen,
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            finishedLoading: false,
        }
        this.signInOutButtonHandler = this.signInOutButtonHandler.bind(this);
    }
    render() {
        return (
                this.state.loggedIn ? <div><Navigation /><HomePage /></div> : <LoginPage finishedLoading={this.state.finishedLoading}/>
        )
    }
}
registerServiceWorker();
ReactDOM.render(<App />, document.getElementById('root'))