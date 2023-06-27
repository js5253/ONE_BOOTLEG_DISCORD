import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as firebase from 'firebase';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: 'User',
            currentDate: new Date().toLocaleDateString(),
            Dialog: {
                show: false,
                title: 'Opened Dialog'
            },
        };
        this.updateTime = this.updateTime.bind(this);
    }
    componentDidMount() {
        this.setState({
            userName: firebase.auth().currentUser.displayName,
        })
    }
    updateTime() {
        this.setState({
            currentTime: Date.now()
        })

    }
    signOut() {
        firebase.auth().signOut();
    }
    render() {

        return (
            <div>
                <div id="welcomePage">
                    <h1>Howdy there, {this.state.userName}  </h1>
                    <div id="actionChunk">
                        <div id="firstRow">
                            <Link to="/friends">
                                Chat with your groups...
                                    </Link>
                            <Link to="/community">
                                Chat with others in the community.
                                    </Link>

                            <Link to="/premium">
                                Get Premium for more groups.
                                    </Link>
                        </div>
                        <div id="secondRow">
                            <Link to="/settings">
                                Set Settings
                                    </Link>
                            <a href="/" onClick={this.signOut}>Sign Out</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomePage;