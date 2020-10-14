const express = require('express');
const app = express();

//body parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// Start server
const PORT = 4000 || process.env.PORT;

app.listen(PORT , ()=>{
    console.log(`server started at http://localhost:${PORT}`)
})