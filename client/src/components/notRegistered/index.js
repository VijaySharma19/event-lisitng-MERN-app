import React, { Component } from 'react';
import { BrowserRouter as Router ,Route,Switch } from 'react-router-dom'

// Components
import Login from "./login";
import SignUp from "./signup"

export class NotRegistered extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            component= {(props)=><Login {...props} user= {this.props.user} addUser = {this.props.addUser}></Login>} 
                        ></Route>

                        <Route
                            exact
                            path='/signup'
                            component= {(props)=><SignUp {...props} user= {this.props.user} addUser = {this.props.addUser}></SignUp>} 
                        ></Route>

                    </Switch>
                </Router>
            </div>
        )
    }
}

export default NotRegistered
