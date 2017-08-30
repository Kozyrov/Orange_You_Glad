const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const {mongoose} = require('./server/db/mongoose');
const {Result} = require('./server/models/result');

var app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve('public')));

app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

app.post('/results', (req, res)=>{
    console.log(req.body);
    let result = new Result({
        correct:req.body.correct,
        answer:req.body.answer,
        user_email:req.body.user_email
    });
    result.save().then((doc)=>{
        res.send(doc);
    }, (err)=>{
        res.send(err);
    })
});

app.listen(port, ()=>{
    console.log(`Orange you glad the app is working on port:${port}`);
});

module.exports = {app};