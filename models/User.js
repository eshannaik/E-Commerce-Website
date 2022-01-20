import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const {isEmail} = require ('validator')

const userSchema = new Schema ({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: [true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate: [isEmail,'Please enter a valid email']
    },
    password : {
        type: String,
        required: [true,'Please enter a valid password'],
        minlength: [8,'Minimum length is 8']
    },
    register_date : {
        type : Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user',userSchema);