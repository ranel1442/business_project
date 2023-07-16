const { string } = require('joi');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    subTitle: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    description: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 1024,
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
    },
    web: {
        type: String,
        minlength: 2,
        maxlength: 4096,
    },
    imageUrl:{
        type: String,
        minlength: 2,
        maxlength: 1024,
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
    emailCreate:{
        type: String,
        // require: true,
        minlength: 6,
        maxlength: 256
    }
});

const Card = mongoose.model('Card', cardSchema);

exports.Card = Card;