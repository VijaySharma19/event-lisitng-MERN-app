const route = require("express").Router();
const { createUser,authenticateUser,getUserById } = require("../db/users");

route.get("/",async(req,res)=>{
    if(req.session.userId){
        getUserById(req.session.userId).then(data=>{
            const result ={
                id: data._id,
                username: data.username,
                emailId : data.emailId,
                contactNo : data.contactNo,
                events : data.events
            }
            res.status(202).send(result)
        }).catch((err)=>{
            err.name=''
            res.status(403).send(err.toString())
        })
    }
    else{
        res.send({error : "No user logged in"})
    }
})

route.post('/signup',async (req,res)=>{
    const username= req.body.username;
    const emailId= req.body.emailId;
    const password= req.body.password;
    const contact= req.body.contact;
    await createUser(username,emailId,contact,password).then(data=>{
        const result ={
            id: data.ops[0]._id,
            username: data.ops[0].username,
            emailId : data.ops[0].emailId,
            contactNo : data.ops[0].contactNo,
            events : data.ops[0].events
        }
        req.session.userId = result.id;
        res.status(201).send(result)
    }).catch(err=>{
        err.name=''
        res.status(406).send(err.toString())
    })
})

route.get("/logout",async(req,res)=>{
    req.session.userId=null;
    res.send("Logged Out")
})

route.post('/login',async (req,res)=>{
    await authenticateUser(req.body.emailId,req.body.password).then((data)=>{
        const result ={
            id: data._id,
            username: data.username,
            emailId : data.emailId,
            contactNo : data.contactNo,
            events : data.events
        }
        req.session.userId = result.id;
        res.status(202).send(result)
    }).catch((err)=>{
        err.name=''
        res.status(403).send(err.toString())
    })
})

exports = module.exports = {
    route
}