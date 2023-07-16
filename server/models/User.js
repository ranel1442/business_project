const { boolean } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    middleName: {
        type: String,
        minlength: 2,
        maxlength: 256,
    },
    lastName: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    phone: {
        type: String,
        require: true,
        minlength: 9,
        maxlength: 14,
    },
    email: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    imageUrl:{
        type: String,
        minlength: 2,
        maxlength: 256,
    },
    imageAlt:{
        type: String,
        minlength: 2,
        maxlength: 256,
    },
    state:{
        type: String,
        minlength: 2,
        maxlength: 256,
    },
    country:{
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    city:{
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    street:{
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    houseNumber:{
        type: String,
        require: true,
        minlength: 1,
        maxlength: 5,
    },
    zip:{
        type: String,
        minlength: 2,
        maxlength: 256,
    },
    business: {
        type: Boolean,
        default:false
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    cardsLove: {
        default:[]
    }
});

const User = mongoose.model('User', userSchema);

exports.User = User;