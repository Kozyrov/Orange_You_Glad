const mongoose = require('mongoose');

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

module.exports = {Result};