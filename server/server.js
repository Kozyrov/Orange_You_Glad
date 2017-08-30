const express = require('express');
const bodyParser = require('body-parser');

const {mogoose} = require('./db/mongoose');
const {Result} = require('./models/result');

var app = express();
const port = process.env.PORT || 3001;

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

app.listen(port, ()=>{
    console.log(`Orange you glad the app is working on port:${port}`);
});

module.exports = {app};