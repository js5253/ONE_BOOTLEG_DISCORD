import React from 'react';
import {Link} from 'react-router-dom'
const Navigation = () => {
    return(
    <nav>
        <ul>
    <li>Chatty</li>
    <li><Link to="/friends">Your Groups</Link></li>
    <li><Link to="/global">Community Chat</Link></li>
    <li><Link to="/premium">Premium</Link></li>
    <li><Link to="/settings">Settings</Link></li>
    <li><Link to="/account/SignOut">Sign Out</Link></li>
    </ul>
    </nav>)
}
export default Navigation
