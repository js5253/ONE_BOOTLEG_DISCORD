import React, { Component } from "react";
import ChatPage from "./ChatPage";

class Friends extends Component {
    render() {
        return(
            <div id="friends">
                        <ChatPage header="Friends" groups={[{"name": "A"}]} messages={[]} />
            </div>
        )
    }

}
export default Friends;