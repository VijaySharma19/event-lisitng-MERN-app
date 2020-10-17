import React, { Component } from 'react';
import { BrowserRouter as Router ,Redirect,Route,Switch } from 'react-router-dom'
import './css/style.css'

// Components
import Login from "./login";
import SignUp from "./signup"

export class NotRegistered extends Component {
    render() {
        return (
            <div className="notRegistered container-fluid">
                <div className="wrapper">
                    <div className="firstItem ">
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
                            <Redirect to='/'></Redirect>
                        </Router>
                    </div>
                    <div className="secondItem ">
                        <img className="item img" src={require("./img/notRegistered.png")} alt='login Pic' />
                    </div>
                </div>
            </div>
        )
    }
}

export default NotRegistered
