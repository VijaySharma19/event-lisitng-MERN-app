import React, { Component } from 'react'
import { BrowserRouter as Router ,Route,Switch } from 'react-router-dom';

// Components
import Dashboard from "./dashboard";
import CreateEvent from "./createEvent";

export class Registered extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            component= {(props)=><Dashboard></Dashboard>} 
                        ></Route>

                        <Route
                            exact
                            path='/createEvent'
                            component= {(props)=><CreateEvent></CreateEvent>} 
                        ></Route>

                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Registered
