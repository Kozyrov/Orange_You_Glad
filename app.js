const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 3001;

//getting the express app started
var app = express();

// app.use(express.static(path.resolve('public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
})

app.post('/results', (req, res)=>{
    res.send('')
} )

//listens for a successful connection and reports that back
app.listen(PORT, () => {
    console.log("Orange you glad the app is working on PORT: ", PORT);
});