import React, { Component } from 'react';
import {Button, Card} from 'react-bootstrap';
import axios from 'axios'

export class EventItem extends Component {

    constructor(props){
        super(props)
        this.deleteEvent = this.deleteEvent.bind(this)
    }

    deleteEvent = (e)=>{
        e.preventDefault();
        axios.post('/events/delete',{
            userId : this.props.user.id,
            eventId : this.props.event._id
        })
        this.props.updateEventList(this.props.event._id)
    }

    render() {
        let title = this.props.event.title;
        let time = this.props.event.time;
        let date = this.props.event.date;
        let location = this.props.event.location;
        let description = this.props.event.description;
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
                        <Card.Text>
                            {description}
                        </Card.Text>
                        <Card.Link >Date : {date}</Card.Link>
                        <Card.Link >Time : {time}</Card.Link>
                        <Button onClick={this.deleteEvent}>Delete Event</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default EventItem
