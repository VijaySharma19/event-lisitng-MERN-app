import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/style.css';

export class Header extends Component {

    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout = (e)=>{
        e.preventDefault()
        this.props.removeUser()
        
    }

    render() {
        return (
            <div className="header-wrapper container-fluid">
                <div className="row">
                    <div className=" item item1 "><Link className='link btn' to='/'>Dashboard</Link></div>
                    <div className=" item item2 "><Link className="link btn" to='/createEvent'>Book Event</Link></div>
                    <div className=" item item3 "><Link  className='link btn' onClick={this.logout} to='/'>Logout</Link></div>
                </div>

            </div>
        )
    }
}

export default Header
