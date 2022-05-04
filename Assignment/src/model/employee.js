const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    age: {
        type: Number,
        require: true,
        min: 18,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    department: {
        type: String,
        require: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// // Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

module.exports = mongoose.model('employee', employeeSchema)