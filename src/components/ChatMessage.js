import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ChatMessage = ({message, thisUser, kind, image }) => {
    return(<span className={"chatMessage " + (thisUser ? "thisSender" : "thisReceiver")}>{message}</span>)
}
export default ChatMessage;

ChatMessage.propTypes = {
    message: PropTypes.string,
    thisUser: PropTypes.bool.isRequired, //thisUser is a boolean if this user wrote it or not
    kind: PropTypes.string.isRequired,
}