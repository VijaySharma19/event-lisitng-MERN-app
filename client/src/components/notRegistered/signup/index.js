import React, { Component } from 'react'
import axios from 'axios';
import { FaUserTie,FaPhoneSquareAlt,FaUserLock } from "react-icons/fa";
import { MdMail } from 'react-icons/md';
import './css/style.css';

//Components
import Message from '../../message/Message';

export class SignUp extends Component {

    constructor(props){
        super(props)
        this.state = {
            username : '',
            email : '',
            contact : '',
            password : '',
            message : '',
            showMessage : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onHide = this.onHide.bind(this);
        this.validatePassword = this.validatePassword.bind(this)
        this.phonenumberValidate = this.phonenumberValidate.bind(this)
    }

    onHide= ()=>{
        this.setState({message : '',showMessage:false})
    }

    validatePassword=()=> 
    { 
        let inputtxt =this.state.password;
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(passw.test(inputtxt)) 
        { 
            return true;
        }
        else
        {
            this.setState({
                password: '',
                message: ' Password should be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter',
                showMessage:true
            }) 
            
            return false;
        }
    }

    phonenumberValidate(inputtxt)
    {
        let phoneno = /^\d{10}$/;
        if((inputtxt.match(phoneno)))
        {
            return true;
        }
        else
        {
            this.setState({
                contactNo: "",
                password : '',
                message: "Please enter 10 digit contact number",
                showMessage : true
            })
            return false;
        }
    }

    handleChange = (e)=>{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({[name]:value});
    }

    onSubmit = (e)=>{
        e.preventDefault()
        
        if(this.phonenumberValidate(this.state.contact)&&this.validatePassword()){
            axios.post('/users/signup',{
                username : this.state.username,
                emailId : this.state.email,
                contact : this.state.contact,
                password : this.state.password
            }).then(async (res)=>{
                await this.props.history.push("/")
                let id,username,emailId,contact,events;
                id=res.data.id;
                username=res.data.username;
                emailId= res.data.emailId;
                contact = res.data.contactNo;
                events= res.data.events;

                await this.props.addUser(id,username,emailId,contact,events);
                
            }).catch(err=>{
                if(err.response){
                    this.setState({
                        username: '',
                        email : '',
                        contact: "",
                        password : '',
                        message: err.response.data,
                        showMessage : true
                    })
                }
            })
        }
        else{
            return;
        }
    }

    render() {
        return (
            <div className="signup-wrapper container fluid">
                <h1 className='heading'>Create Account</h1>
                <div className="form-wrapper container fluid">
                    <form className="form" onSubmit={this.onSubmit}>
                        <label className="item row">
                            <span className='col col-3'><FaUserTie></FaUserTie> </span> 
                            <input 
                                required
                                type="text" 
                                name="username"
                                className="col col-9"
                                placeholder="Choose Username"
                                value={this.state.username}
                                onChange = {this.handleChange}
                            ></input>
                        </label>
                        <label className=" item row">
                            <span className='col col-3'><MdMail></MdMail> </span> 
                            <input 
                                required
                                type="email" 
                                name="email" 
                                className="col col-9"
                                placeholder="Enter Email Id"
                                value={this.state.email}
                                onChange = {this.handleChange}
                            ></input>
                        </label>
                        <label className="item row">
                            <span className='col col-3'><FaPhoneSquareAlt></FaPhoneSquareAlt> </span> 
                            <input 
                                required
                                type="text" 
                                name="contact"
                                className=" col col-9"
                                placeholder="Enter Contact No"
                                value={this.state.contact}
                                onChange = {this.handleChange}
                            ></input>
                        </label>
                        <label className="item row">
                            <span className='col col-3'><FaUserLock></FaUserLock> </span> 
                            <input 
                                required
                                type="password" 
                                name="password"
                                className="col col-9"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange = {this.handleChange}
                            ></input>
                        </label>
                        <button type="submit " className="btn btn-block item">Create Account</button>
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

export default SignUp
