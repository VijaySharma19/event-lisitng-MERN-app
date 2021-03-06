const express = require('express');
const app = express();
const path = require('path')
//body parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Maintain session 

const session = require("express-session")
app.use(session({
    resave : true,
    saveUninitialized:true,
    secret:"sbdckjshfiuwgdws863"
}))

// Routing 
app.use('/users',require('./routes/userRoutes').route);
app.use('/events',require('./routes/eventsRoute').route)


// Start server
const PORT = process.env.PORT || 3232;

//server static assets if in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT , ()=>{
    console.log(`server started at http://localhost:${PORT}`)
})