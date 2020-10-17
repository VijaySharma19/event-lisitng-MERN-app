import React, { Component } from 'react'
import { BrowserRouter as Router ,Redirect,Route,Switch } from 'react-router-dom';

// Components
import Dashboard from "./dashboard";
import CreateEvent from "./createEvent";
import Header from './header/Header';

export class Registered extends Component {
    render() {
        return (
            <div>
                
                <Router>
                    <Header removeUser= {this.props.removeUser} ></Header>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            component= {(props)=><Dashboard {...props} user={this.props.user}></Dashboard>} 
                        ></Route>

                        <Route
                            exact
                            path='/createEvent'
                            component= {(props)=><CreateEvent {...props} user={this.props.user}></CreateEvent>} 
                        ></Route>

                    </Switch>
                    <Redirect to='/'></Redirect>
                </Router>
            </div>
        )
    }
}

export default Registered
