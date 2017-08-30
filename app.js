const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;

//getting the express app started
var app = express();

//consuming middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes());

//listens for a successful connection and reports that back
app.listen(PORT, () => {
    console.log("Orange you glad the app is working on PORT: ", PORT);
});