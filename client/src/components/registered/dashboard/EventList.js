import React, { Component } from 'react'
import EventItem from './EventItem';

export class EventList extends Component {
    render() {
        return (this.props.eventList.map(event=>{
            return <EventItem
                        key={event._id}
                        event = {event}
                        user = {this.props.user}
                        updateEventList={this.props.updateEventList}
                    ></EventItem>
        }))
    }
}

export default EventList
