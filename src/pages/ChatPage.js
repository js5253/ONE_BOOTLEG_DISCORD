import React, { Component } from "react";
import Websocket from 'react-websocket'
import * as firebase from 'firebase';
import firebaseConfig from './firebase-config';
import { Placeholder } from "./uiElements";
import PropTypes from 'prop-types'
import ChatMessage from './ChatMessage'
import { ProgressCircle } from './uiElements'
import { Link } from 'react-router-dom'
// var messagesWS = new WebSocket('ws://localhost');
// <Websocket url='ws://localhost:8888/' onMessage={this.handleData} -->

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.getMessages = this.getMessages.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.state = {
            groups: [],
            messages: [

            ],
            currentGroup: null,
        }
    }
    componentDidMount() {
        this.getDestination();
        this.getMessages();
        // const location = `/destinations/${firebase.auth().currentUser.uid}/`;
        const location = '/'
        console.log(location);
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/").on('value', val => this.setState({
            messages: val.toJSON().messages,
            groups: val.toJSON().groups,
        }));
    }
    getDestination() {

    }
    submitMessage(e) {
        e.preventDefault();
        console.log("AAAAA")
    }
    getMessages() {
        // var messages = [];
        // for (var e = 0; e < this.props.messages.length; e++) {
        //     console.log("message found")
        //     messages[e] = this.state.messages[e];
        // }
    }
    updateMessages(e) {

    }
    handleData(data) {
        let result = JSON.parse(data);
    }
    render() {
        const groups = this.state.groups;
        const messages = this.state.messages;
        return (
            // <Placeholder finishedLoading={true}>
            <div style={{ display: 'flex' }}>
                {/* <div id="loadingContainer_fullArea"><ProgressCircle /></div> */}
                <div id="destinationArea">
                    <button className="panelCloseButton">&larr; </button>
                    <h2>{this.props.header}</h2>
                    {Object.keys(groups).map(_ => { console.log(groups); return(<button key={groups[_].name}>{groups[_].name}</button>)})}
                    <Link to="/friends/add-friend">Add Friends</Link>
                </div>
                {/* <div id="subDestinationArea">
                    </div> */}
                <div id="currentConversationArea">
                {Object.keys(messages).map(function(_) { console.log(messages[_].message); return(<ChatMessage thisUser={true} key={messages[_].message} message={messages[_].message}/>)})}
                    <div id="messageWriteArea">
                        <button>GIF</button>
                        <form onSubmit={this.submitMessage}><input type="text" /></form>
                    </div>
                </div>
            </div>
            // </Placeholder>
        )
    }
}
export default ChatPage;

ChatPage.propTypes = {
    messages: PropTypes.array,
    header: PropTypes.string.isRequired,
    isSubDestinationAreaOpen: PropTypes.bool,
    dbLocation: PropTypes.array.isRequired,
    subDestination: PropTypes.array,
}