const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const PORT = 3001;

//getting the express app started
var app = express();

//the only route
app.post('/results', (req, res)=>{
    res.send('')
} )

//listens for a successful connection and reports that back
app.listen(PORT, () => {
    console.log("Orange you glad the app is working on PORT: ", PORT);
});