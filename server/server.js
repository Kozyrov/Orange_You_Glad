const express = require('express');
const bodyParser = require('body-parser');

const {mogoose} = require('./db/mongoose');
const {Result} = require('./models/result');

var app = express();

app.use(bodyParser.json());

app.post('/results', (req, res)=>{
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

app.listen(3001, ()=>{
    console.log('Orange you glad the app is working on port 3001');
})