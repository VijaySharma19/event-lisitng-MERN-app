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
  }

  // componentDidMount(){
  //   axios.get('/',{},(res)=>{
  //     console.log(res)
  //   })
  // }



  render() {
    var loggedInDependent;
    if(this.state.user.isLoggedIn){
      loggedInDependent =<Registered></Registered>
    }
    else{
      loggedInDependent = <NotRegistered></NotRegistered>
    }

    return (
      <React.Fragment>
          {loggedInDependent}
      </React.Fragment>
    )
  }
}

export default App
