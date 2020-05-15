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

//function that deletes one role by id
async function deleteRole( id ) {
    let deleteRole = await databaseModel.Roles.deleteOne( { _id: id } )
    .then( result => result );

    return deleteRole;
}

//function that searches by role id and returns a role
async function getRoleby( id ) {
    let role = await databaseModel.Roles.find({ _id: id })
    .then( result => result );

    return role;
}

//function that searches by role id and returns its description
async function getRoleby( id ) {
    let roleDescription = await databaseModel.Roles.find({ _id: id })
    .then( role => role[0].description );

    return roleDescription;
}

//function that returns a role id by description
async function getRoleDescriptionId( description ) {
    let roleId = await databaseModel.Roles.find({ description: description })
    .then( role => role[0]._id );

    return roleId;
}

//function that updates a role by id
async function updateRole( id, role ) {
    let updateRole = await databaseModel.Roles.updateOne( { _id: id }, { $set: role })
    .then( result => result);
    
    return updateRole;
}

module.exports.clearRolesDocuments = clearRolesDocuments;
module.exports.deleteRole = deleteRole
module.exports.getRoles = getRoles;
module.exports.getRoleby = getRoleby;
module.exports.getRoleDescriptionId = getRoleDescriptionId;
module.exports.insertRole = insertRole;
module.exports.updateRole = updateRole;
