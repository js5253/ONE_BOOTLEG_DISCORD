import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


export default function App() {
    return(
        this.state.signedIn ?
        <Router>
          <div>
            <Navigation shown={!this.state.homePageShown} />
            <div style={{padding: 0}}>
            <Route exact path="/" component={HomePage} />
            <Route path="/friends" component={Friends} />
            <Route path="/global" component={Community} />
            <Route path="/premium" component={GetPremium} />
            <Route path="/settings" component={Settings} />    
            </div>                
          </div>
        </Router> :
        <LoginPage finishedLoading={this.state.finishedLoading} />
)
}