import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
// Components
import Message from '../../message/Message'
import './css/style.css';

export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            message: '',
            showMessage : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onHide= ()=>{
        this.setState({message : '',showMessage:false})
    }

    handleChange = (e)=>{
        let target = e.target;
        let value = target.value;
        let name = target.name
        this.setState({
            [name] : value
        })
    }

    login = (e)=>{
        e.preventDefault();
        axios.post('/users/login',{
            emailId : this.state.email,
            password : this.state.password
        }).then(async (res)=>{
            let id,username,emailId,contact,events;
            id=res.data.id;
            username=res.data.username;
            emailId= res.data.emailId;
            contact = res.data.contactNo;
            events= res.data.events;
            await this.props.addUser(id,username,emailId,contact,events);
        }).catch(err=>{
            this.setState({
                email:'',
                password : '',
                message: err.response.data,
                showMessage : true
            })
        })
    }

    render() {
        return (
            <div className="login-wrapper container-fluid">
                <h1 className="heading">Login</h1>
                <div className="form-wrapper">
                    <form className="form" onSubmit={this.login}>
                        <label className="form-group item">
                            <center>Email Id</center>
                            
                            <center><input 
                                required
                                type="email" 
                                name="email"
                                placeholder="Enter your Email Id"
                                className="form-control"
                                value={this.state.email}
                                onChange = {this.handleChange}
                            ></input></center>
                        </label>
                        <label className="form-group item">
                        <center>Password</center> 
                            <center><input 
                                required
                                type="password" 
                                name="password"
                                placeholder="Enter your Password"
                                className="form-control"
                                value={this.state.password}
                                onChange = {this.handleChange}
                            ></input></center>
                        </label>
                        <center><button type="submit" className="btn btn-block item">Login</button></center>
                        <span className="item" style={{textAlign:"center"}}>----OR----</span>
                        <center><Link to='/signup' className="btn btn-block item">Create New Account</Link></center>
                    </form>
                </div>
                <Message
                    show={this.state.showMessage}
                    onHide={this.onHide}
                    message={this.state.message}
                ></Message>
            </div>
        )
    }
}

export default Login
