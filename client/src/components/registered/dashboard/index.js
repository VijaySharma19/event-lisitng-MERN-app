import React, { Component } from 'react'
import axios from 'axios';
import './css/style.css'
//Components
import EventList from './EventList';

export class Dashboard extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            events : [],
        }

        this.updateEventList = this.updateEventList.bind(this)

    }

    updateEventList=async (eventId)=>{
        let updatedList = this.state.events; 
        updatedList=updatedList.filter(event=>event._id !== eventId)
        await this.setState({events : updatedList})
    }

    componentDidMount(){
        axios.get(`/events?userId=${this.props.user.id}`).then(res=>{
            console.log((res.data))
            this.setState({events : res.data})
        }).catch(err=>{console.log(err.response)})
    }

    render() {
        var eventsDependentComponent;
        if(this.state.events.length === 0){
            eventsDependentComponent = <div className='no-events'><h2>No Events</h2></div>
        }
        else{
            eventsDependentComponent = <div className='events container-fluid ' style={{padding:'0px'}}>
                                            
                                            <EventList 
                                                user={this.props.user} 
                                                eventList={this.state.events}
                                                updateEventList={this.updateEventList}
                                            ></EventList>
                                        </div>
        }

        return (
            <div className="dashboard-wrapper container-fluid">
                {eventsDependentComponent}             
            </div>
        )
    }
}

export default Dashboard
