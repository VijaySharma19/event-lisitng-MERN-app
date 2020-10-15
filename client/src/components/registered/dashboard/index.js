import React, { Component } from 'react'
import axios from 'axios';

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
            eventsDependentComponent = <h2>No Events</h2>
        }
        else{
            eventsDependentComponent = <EventList 
                                            user={this.props.user} 
                                            eventList={this.state.events}
                                            updateEventList={this.updateEventList}
                                        ></EventList>
        }
        return (
            <div>
                <h1>Dashboard</h1>
                {eventsDependentComponent}
            </div>
        )
    }
}

export default Dashboard
