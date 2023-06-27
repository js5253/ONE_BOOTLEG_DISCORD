import React, { Component } from "react";
import ChatPage from "./ChatPage";

class Community extends Component {
    render() {
        return(
            <ChatPage header="Community Chat" groups={[{"name": "A"}]} messages={[]} />
        )
    }

}
export default Community;