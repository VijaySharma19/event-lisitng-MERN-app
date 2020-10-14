const {MongoClient,ObjectID} = require("mongodb");

require("dotenv").config()

const MongoURL = process.env.Mongo_URL;
const dbName = process.env.db_Name;


async function createUser(username,emailId,contactNo,password){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const users = await eventDb.collection('users');

    return await users.findOne({"emailId": emailId }).then((res)=>{
        if(res==null){
            const user =  users.insertOne({
                username : username,
                emailId : emailId,
                contactNo : contactNo,
                password : password,
                events : []
                
            })
        
            return user;
        }
        else{
            throw new Error("User with this Email Id already exists. Please either Login Or try again using another Email Id")
        }
    }).catch(err=>{throw err})
}

async function authenticateUser(emailId,password){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const users = await eventDb.collection('users');


    return await users.find({emailId : emailId}).toArray().then((user)=>{
        if(user==0){
            throw new Error("No such user Exist")
        }
        else{
            if(user[0].password===password){
                return user[0];
            }
            else{
                console.log("rejected with Incorrect password")
                throw new Error ('Incorrect password');
            }
        }
    }).catch((err)=>{
        throw err
    })
   
}

async function getAllUsers(){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const users = await eventDb.collection('users');

    const user = await users.find().toArray();
    return user;
}

async function addEventToList(userId,eventId){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const users = await eventDb.collection('users');

    return await users.findOne({"_id":ObjectID(userId)}).then(res=>{
        const query = {"_id" : ObjectID(userId)};
        const updatedEventList = [...res.events,ObjectID(eventId)];
        const newValues = { $set : {events : updatedEventList} };
        users.updateOne(query,newValues,(err,res)=>{
            if(err){
                throw err;
            }
            console.log("Updated successfully");
        })
    }).catch(err=>{throw err})
}

async function removeEventFromList(userId,eventId){
    const client = await MongoClient.connect(MongoURL);
    const eventDb = await client.db(dbName);
    const users = await eventDb.collection('users');

    return await users.findOne({"_id": ObjectID(userId)}).then(result=>{
        let updatedEventList=result.events;
        updatedEventList = updatedEventList.filter(event=> event!=eventId);
        
        const query = { "_id" : ObjectID(userId)  };
        const newValues = { $set : {events : updatedEventList} }
        users.updateOne(query,newValues,(err,res)=>{
            if(err){
                throw err;
            }
        })
    }).catch(err=>{throw err})
}

exports = module.exports = {
    authenticateUser,
    createUser,
    addEventToList,
    removeEventFromList
} 



// user id - 5f86d7e1504522308c3410cc
// event id - 5f8702331e1c2842ac1f52eb