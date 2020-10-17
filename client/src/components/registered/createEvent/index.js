import React, { Component } from 'react'
import axios from 'axios';
import './css/style.css';

export class CreateEvent extends Component {

    constructor(props){
        super(props)
        this.state = {
            title : '',
            date : '',
            time : '',
            location : '',
            description : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.changeLocation = this.changeLocation.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange = (e)=>{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({[name]:value});
        
    }

    changeLocation = (e)=>{
        this.setState({location:e.target.value})
    }

    submit = e =>{
        e.preventDefault()
        if(this.state.location){
            const { title,time,date,description,location } = this.state;
            const userId = this.props.user.id
            axios.post('/events',{
                title,
                time,
                date,
                description,
                location,
                userId
            }).then(res=>{
                console.log(res.data)
                this.props.history.push('/')
            }).catch(err=>{alert(err.response.data)})
        }
        else{
            alert("Please select Location to Book Event")
        }
    }

    render() {
        let today = new Date() ;
        let date = (today.getDate()+1).toString(); 
        let month = (today.getMonth()+1).toString();
        let year = (today.getFullYear()).toString();
        let currentDate = year+'-'+month+'-'+date;
        return (
            <div className='createEvent'>
                <div className='createEvent-wrapper container-fluid'>
                    <h1 className='heading'>Create Event</h1>
                    <form className='form row' onSubmit = {this.submit}>
                        <label className = 'col col-12 item'>
                            <span className='subItem1' style={{fontSize:'1.5rem'}}>Title : </span>
                            <input
                                required
                                type='text'
                                name="title"
                                className='subItem2'
                                placeholder="Choose a Title for Event. "
                                value = {this.state.title}
                                onChange = {this.handleChange}
                            ></input>
                        </label>    
                        <label className = 'col col-7 item'>
                            <span className='subItem1'  style={{fontSize:'1.5rem'}}>Date : </span> 
                            <input
                                required
                                type='date'
                                name="date"
                                className='subItem2'
                                min={currentDate}
                                value = {this.state.date}
                                onChange = {this.handleChange}
                            ></input>
                        </label>   
                        <label className = 'col col-5 ' style={{textAlign:"right",paddingRight:'1rem'}} >
                            <span  style={{fontSize:'1.5rem'}}>Time : </span>
                            <input
                                required
                                type='time'
                                name="time"
                                value = {this.state.time}
                                onChange = {this.handleChange}
                            ></input>
                        </label> 
                        <label className = 'col col-12 item'>
                            <span style={{fontSize:'1.5rem'}}>Location : </span>
                            <label className = 'col col-12 item'>
                                <input
                                    type="radio"
                                    className='subItem1'
                                    value="The Junkyard Café, Connaught Place, Delhi"
                                    checked={this.state.location === "The Junkyard Café, Connaught Place, Delhi"}
                                    onChange = {this.changeLocation} 
                                ></input>
                                <span className='subItem2'>The Junkyard Café, Connaught Place, Delhi</span>
                            </label> 
                            <label className = 'col col-12 item'>
                                <input
                                    type="radio"
                                    className='subItem1'
                                    value="Antisocial, Hauz Khas Village, Delhi"
                                    checked={this.state.location === "Antisocial, Hauz Khas Village, Delhi"}
                                    onChange = {this.changeLocation} 
                                ></input>
                                <span className='subItem2'>Antisocial, Hauz Khas Village, Delhi</span>
                            </label> 
                            <label className = 'col col-12 item'>
                                <input
                                    className='subItem1'
                                    type="radio"
                                    value="Turquoise Cottage, Sector 38, Noida"
                                    checked={this.state.location === "Turquoise Cottage, Sector 38, Noida"}
                                    onChange = {this.changeLocation} 
                                ></input>
                                <span className='subItem2'>Turquoise Cottage, Sector 38, Noida</span>
                            </label> 
                            <label className = 'col col-12 item'>
                                <input
                                    type="radio"
                                    className='subItem1'
                                    value="Raasta, DLF Cyber City, Delhi"
                                    checked={this.state.location === "Raasta, DLF Cyber City, Delhi"}
                                    onChange = {this.changeLocation} 
                                ></input> 
                                <span className='subItem2'>Raasta, DLF Cyber City, Delhi</span>
                            </label> 
                        </label>  
                        <label className = 'col col-12 item'>
                            <span style={{fontSize:'1.5rem'}} >About Event : </span><br />
                            <textarea
                                required
                                name="description"
                                placeholder="Write something about event."
                                className = 'col col-12 item'
                                value={this.state.description}
                                onChange={this.handleChange} 
                            ></textarea>
                        </label> 
                        <button className='btn btn-block item'  type="submit"  style={{fontSize:'1.5rem'}}>Book Event</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default CreateEvent
