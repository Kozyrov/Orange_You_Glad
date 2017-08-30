var {mogoose} = require('./db/mongoose')

var Result = mongoose.model('Results', {
    correct: {
        type: Boolean,
        required: true
    },
    answer: {
        type: String,
        required: true,
        enum: ["apples", "oranges", "both"] 
    },
    user_email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (val)=>{
                return /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/.test(val);
            }
        }
    }
});

var newResult = new Result({
    correct: true,
    answer: "both",
    user_email: "sfrankie11@gmail.com"
});

newResult.save().then((data)=>{
    console.log('Result saved', data)
}, (err)=>{
    console.log('Unable to save result', err)
})