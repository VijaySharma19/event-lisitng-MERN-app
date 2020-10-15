import React, { Component } from 'react'
import axios from 'axios';

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
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Name : 
                        <input 
                            required
                            type="text" 
                            name="username"
                            value={this.state.username}
                            onChange = {this.handleChange}
                        ></input>
                    </label>
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
                        Contact No : 
                        <input 
                            required
                            type="text" 
                            name="contact"
                            value={this.state.contact}
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
                    <button type="submit">Sign Up</button>
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

export default SignUp
