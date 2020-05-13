 const mongoose = require('mongoose');
 const roleDatabaseModel = require('./roles');

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

//create schema for user_role table
const userRolesSchema =  new mongoose.Schema({ 
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    id_rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `${roleDatabaseModel.Roles}`
    }
});


//create users model from usersSchema
const Users = mongoose.model("Users", usersSchema); 
//create userRole model from userRolesSchema
const UserRoleSchema = mongoose.model("UserRol", userRolesSchema);

module.exports.Users = Users;
module.exports.UserRoleSchema = UserRoleSchema;
