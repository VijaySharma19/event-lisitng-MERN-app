import React, { Component } from 'react'
import axios from 'axios';

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
            <div>
                <h1>Create Event</h1>
                <form onSubmit = {this.submit}>
                    <label>
                        Title : <br />
                        <input
                            required
                            type='text'
                            name="title"
                            value = {this.state.title}
                            onChange = {this.handleChange}
                        ></input>
                    </label>    <br />
                    <label>
                        Date : <br />
                        <input
                            required
                            type='date'
                            name="date"
                            min={currentDate}
                            value = {this.state.date}
                            onChange = {this.handleChange}
                        ></input>
                    </label>    <br />
                    <label>
                        Time : <br />
                        <input
                            required
                            type='time'
                            name="time"
                            value = {this.state.time}
                            onChange = {this.handleChange}
                        ></input>
                    </label> <br/>
                    <label>
                        Location : <br />
                        <label>
                            <input
                                type="radio"
                                value="The Junkyard Café, Connaught Place, Delhi"
                                checked={this.state.location === "The Junkyard Café, Connaught Place, Delhi"}
                                onChange = {this.changeLocation} 
                            ></input>
                            The Junkyard Café, Connaught Place, Delhi
                        </label> <br />
                        <label>
                            <input
                                type="radio"
                                value="Antisocial, Hauz Khas Village, Delhi"
                                checked={this.state.location === "Antisocial, Hauz Khas Village, Delhi"}
                                onChange = {this.changeLocation} 
                            ></input>
                            Antisocial, Hauz Khas Village, Delhi
                        </label> <br />
                        <label>
                            <input
                                type="radio"
                                value="Turquoise Cottage, Sector 38, Noida"
                                checked={this.state.location === "Turquoise Cottage, Sector 38, Noida"}
                                onChange = {this.changeLocation} 
                            ></input>
                            Turquoise Cottage, Sector 38, Noida
                        </label> <br />
                        <label>
                            <input
                                type="radio"
                                value="Raasta, DLF Cyber City, Delhi"
                                checked={this.state.location === "Raasta, DLF Cyber City, Delhi"}
                                onChange = {this.changeLocation} 
                            ></input> 
                            Raasta, DLF Cyber City, Delhi
                        </label> <br />
                    </label>  
                    <label>
                        About Event : <br />
                        <textarea
                            required
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange} 
                        ></textarea>
                    </label> <br />
                    <button type="submit">Book Event</button>
                </form>
                
            </div>
        )
    }
}

export default CreateEvent
