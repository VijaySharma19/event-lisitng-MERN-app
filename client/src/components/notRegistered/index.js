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
                            component= {(props)=><Login></Login>} 
                        ></Route>

                        <Route
                            exact
                            path='/signup'
                            component= {(props)=><SignUp></SignUp>} 
                        ></Route>

                    </Switch>
                </Router>
            </div>
        )
    }
}

export default NotRegistered
