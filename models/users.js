 const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/database');

//create schema for Users 
const usersSchema =  new mongoose.Schema({ 
    username: {
        type: String, 
        required: true   
    },
    name_lastname: String,
    email: String,
    telephone: String,
    delivery_address: String,
    password: String
});

//create users model from usersSchema
const Users = mongoose.model("Users", usersSchema); 

module.exports.Users = Users;
