const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    
    fullName: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    },

    mobileNumber: {
        type: String,
        required: true,
        minlength: 10,
        unique: true
    },

    password: {
        type: String,
        requried: true,
        minlength: 5
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("userDatabase", signUpTemplate);