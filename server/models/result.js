const mongoose = require('mongoose');

var Result = mongoose.model('Results', {
    correct: {
        type: Boolean,
    },
    answer: {
        type: Array,
    },
    user_email: {
        type: String,
        trim: true,
        validate: {
            validator: (val)=>{
                return /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/.test(val);
            }
        }
    }
});

module.exports = {Result};