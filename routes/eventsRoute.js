const route = require("express").Router()
const { createEvent,deleteEvent,loadEvents } = require("../db/events");

route.post('/',async (req,res)=>{
    
    const title = req.body.title;
    const date = req.body.date;
    const time = req.body.time;
    const location = req.body.location;
    const description = req.body.description;
    const userId = req.body.userId;
    await createEvent(title,date,time,location,description,userId).then((data)=>{
        res.status(201).send("Added Successfully :)");
    }).catch(err=>{
        err.name=''
        res.status(405).send(err.toString())
    })
})

route.get('/',async (req,res)=>{
    await loadEvents(req.query.userId).then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        err.name=''
        res.status(400).send(err.toString())
    })
})

route.post('/delete',async (req,res)=>{
    await deleteEvent(req.body.userId,req.body.eventId).then(data=>{
        res.status(201).send("Removed Successfully");
    }).catch(err=>{
        err.name="";
        res.status(400).send(err.toString());
    })
})

exports = module.exports={
    route
}