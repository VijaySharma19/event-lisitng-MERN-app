import React, { Component } from 'react';
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
        let date = this.props.event.date;
        date= date.split('-');
        let day = date[2];
        let monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let month = monthArray[date[1]-1]
        let year = date[0] 
        let subtitle = this.props.event.location
        let shift ='AM'
        let time = this.props.event.time;
        time = time.split(':')
        if(parseInt(time[0])===24){
            shift = 'AM'
        }
        if(parseInt(time[0])>12 ){
            time[0]=(parseInt(time[0])-12)
            time[0]=time[0].toString()
            shift = 'PM'
        }
        time =time[0]+':'+time[1]+' '+shift
        let description = this.props.event.description;
        return (
            <div className='row container event-wrapper'>
                    <div className="col col-3 col-sm-2 first">
                        <div className='col col-12 ' style={{textAlign:"center",fontSize:'1.15rem'}} >{day} {month} {year}</div>
                    </div>
                    <div className="col col-9 col-sm-10 second">
                        <div className="col col-12 item" style={{fontSize:'2rem',paddingTop:'0.75rem'}} >{title}</div>
                        <div className="row">
                            <div className="col col-8 col-md-10 item" style={{fontSize:'1.25rem',color:'#835858'}}>{subtitle}</div>
                            <div className="col col-4 col-md-2 " style={{textAlign:'center',fontSize:'1.15rem'}}>{time}</div>
                        </div>  
                        <div className="col col-12 item" style={{paddingBottom:'0.75rem'}}>{description}</div>
                    </div>
                </div>
        )
    }
}

export default EventItem
