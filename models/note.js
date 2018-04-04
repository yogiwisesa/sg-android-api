var mongoose = require('mongoose')

var Note = mongoose.model('Note',{
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    user: {
        type: String,
        required: true,
        minLength: 1
    }
});

module.exports= {Note};