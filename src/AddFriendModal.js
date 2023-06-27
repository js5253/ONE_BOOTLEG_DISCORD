import React, { Component } from 'react'

export default class AddFriendModal extends Component {
    render() {
        return(
            <div>
                <h1>Add Friend</h1>
                <h2>Invite a friend by using their username or sending them an invitation</h2>
                <form method="post">
                    <input type="text" />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}