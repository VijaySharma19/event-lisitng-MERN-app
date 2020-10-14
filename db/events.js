const {MongoClient,ObjectID} = require("mongodb");
const { addEventToList,removeEventFromList }= require("./users")

require("dotenv").config()

const MongoURL = process.env.Mongo_URL;
const dbName = process.env.db_Name;


async function createEvent (title,date,time,location,description,userId){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const events = await eventDb.collection('events');

    const event =  await events.insertOne({
        title : title,
        date  : date,
        time : time,
        location : location,
        description : description,
        userId : ObjectID(userId)
    })
    addEventToList(userId,event.ops[0]._id);
}

async function deleteEvent(userId,eventId){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const events = await eventDb.collection('events');

    return  await events.deleteOne({"_id": ObjectID(eventId)}).then(()=>{
        removeEventFromList(userId,eventId)
    }).catch(err=>{throw err})
}

async function getAllEvents(){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const events = await eventDb.collection('events');

    const result = events.find().toArray()
    return result;
}

async function loadEvents(userId){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const events = await eventDb.collection('events');

    const result = await events.find({ userId : ObjectID(userId) }).toArray()
    return result;
}

exports = module.exports = {
    createEvent,
    deleteEvent,
    loadEvents
} 
