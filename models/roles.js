const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for roles table
const rolesSchema =  new mongoose.Schema({ 
    description: String, 
});


//create roles model from rolesSchema
const Roles = mongoose.model("Roles", rolesSchema); 


module.exports.Roles = Roles;
