import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
// Components
import Message from '../../message/Message'

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
            <div>
                <h1>Login</h1>
                <form onSubmit={this.login}>
                    <label>
                        Email : 
                        <input 
                            required
                            type="email" 
                            name="email"
                            value={this.state.email}
                            onChange = {this.handleChange}
                        ></input>
                    </label>
                    <label>
                        Password : 
                        <input 
                            required
                            type="password" 
                            name="password"
                            value={this.state.password}
                            onChange = {this.handleChange}
                        ></input>
                    </label>
                    <button type="submit">Login</button><br></br>
                    <span>----OR----</span><br></br>
                    <Link to='/signup'>Create New Account</Link>
                </form>
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
