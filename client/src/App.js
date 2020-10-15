import React, { Component } from 'react';
import axios from 'axios';

// Components
import NotRegistered from './components/notRegistered';
import Registered from './components/registered'

export class App extends Component {

  constructor(props){
    super(props)
    this.state={
      user : {
        isLoggedIn : false
      }
    }
    
    this.addUser = this.addUser.bind(this);
    // this.removeUser = this.removeUser.bind(this);

  }

  componentDidMount(){
    axios.get('/users').then(res=>{
      if(res.data.error){
        console.log(res.data.error)
      }
      else{
        let id,username,emailId,contact,events;
            id=res.data.id;
            username=res.data.username;
            emailId= res.data.emailId;
            contact = res.data.contactNo;
            events= res.data.events;
            this.addUser(id,username,emailId,contact,events);
      }
    }).catch(err=>{
      console.log(err)
    })
    
  }

  addUser = (id,username,emailId,contact,events)=>{
    this.setState({user : {
      id: id,
      username : username,
      emailId : emailId,
      contact : contact , 
      events : events,
      isLoggedIn : true
    }})
  }

  // removeUser = ()=>{
  //   this.setState({user : {
  //     isLoggedIn : false
  //   }})
  // }



  render() {
    var loggedInDependent;
    if(this.state.user.isLoggedIn){
      loggedInDependent =<Registered user = {this.state.user}  ></Registered>
    }
    else{
      loggedInDependent = <NotRegistered user = {this.state.user} addUser = {this.addUser}></NotRegistered>
    }

    return (
      <React.Fragment>
          {loggedInDependent}
      </React.Fragment>
    )
  }
}

export default App
