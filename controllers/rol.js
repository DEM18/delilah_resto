const databaseModel = require('../models/roles'); 

//function that inserts role in Roles table
async function insertRole( rol ) {
    const newRole = new databaseModel.Roles( rol );

    let saveRole = await newRole.save();
    return saveRole;
}

//function that returns roles in Roles table
async function getRoles() {
    let roles = await databaseModel.Roles.find()
    .then( result => result );

    return roles;
}

//function that clears all documents in Roles table
async function clearRolesDocuments() {
    let clearResult = await databaseModel.Roles.deleteMany( {} )
    .then( result => result );

    return clearResult;
}

//function that returns a role by id
async function getRoleby( id ) {
    let role = await databaseModel.Roles.find({ _id: id })
    .then( result => result );

    return role;
}

//function that returns a role id by description
async function getRoleDescriptionId( description ) {
    let roleId = await databaseModel.Roles.find({ description: description })
    .then( role => role[0]._id );

    return roleId;
}

module.exports.clearRolesDocuments = clearRolesDocuments;
module.exports.getRoles = getRoles;
module.exports.insertRole = insertRole;
module.exports.getRoleby = getRoleby;
module.exports.getRoleDescriptionId = getRoleDescriptionId;
