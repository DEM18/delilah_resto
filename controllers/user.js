const databaseModel = require('../models/Users'); 
const roleController = require('./role');
const ROLE_USER_DESCRIPTION = "User" ;

//function that look for user by username or email and password in database
async function searchUserByCredentials( username, password ) {
    let user = await databaseModel.Users.find( { $and: [ { $or: [ { username: username }, { email: username } ]}, { password: password}]})
    .then(user => user);

    return user;
}

//function that searches user for username and email in database
async function findUserBy ( username, email ) {
   let user = await databaseModel.Users.find({ $or: [ { username: username }, { email: email } ]})
    .then( user => user );

    return user;
}

//function that searches user for username and email in database
async function existUserEmail ( email ) {
    let user = await databaseModel.Users.find({ email: email } )
     .then( user => user );
 
     return user;
 }

//function that inserts user into database
async function insertUser( user ) {
    const newUser = new databaseModel.Users( user ); 
    
    let saveUserId = await newUser.save()
    .then(user => user._id);

    let rolUserId = await roleController.getRoleDescriptionId( ROLE_USER_DESCRIPTION )
    .then( result => result);

    let userRole = {
        id_user: saveUserId,
        id_rol: rolUserId
    }

    let saveUserRole = await insertUserRole( userRole )
    .then( result => result );

    return saveUserId;
}


//function that searches by user id and returns its username
async function getUserUsername( id ) {
    let userUsername = await databaseModel.Users.find({ _id: id })
    .then( user => user[0].username );

    return userUsername;
}

//function that inserts userid with a roleid
async function insertUserRole( userRole ) {
    const newUserRole = new databaseModel.UserRoleSchema( userRole ); 
    
    let saveUserRole = await newUserRole.save();
    return saveUserRole;
}

//function that searches by username id  and returns role id
async function getRoleIdBy( usernameId ) {
    let roleId = await databaseModel.UserRoleSchema.find({ id_user: usernameId })
    .then( userRole => userRole[0].id_rol );

    return roleId;
}

//function that searches user by username and returns its id
async function getUserId( username ) {
    let userId = await databaseModel.Users.find({ username: username })
    .then( user => user[0]._id );

    return userId;
}

//function that updates user properties
async function updateUser( id, newUserData ) {
    if ( newUserData.email ) {
        let existUser = await existUserEmail( newUserData.email )
            .then( user => user);

        if( !existUser.length ) {
            let newUpdateUser = await databaseModel.Users.updateOne( { _id: id }, { $set: newUserData })
            .then( result => result ); 
    
            return newUpdateUser;
        } else {
            return false;
        }
    }

    let newUpdateUser = await databaseModel.Users.updateOne( { _id: id }, { $set: newUserData })
        .then( result => result ); 
    return newUpdateUser;
}

//function that deletes one favorite Product by id
async function clearUser( id ) {
    let clearUserId = await databaseModel.Users.deleteOne( { _id: id } )
    .then( result => result );

    return clearUserId;
}

//function that updates user role by user id
async function updateUserRole( id , newRoleId ) {
    let newUserRole = await databaseModel.UserRoleSchema.updateOne( { id_user: id }, { $set: { id_rol: newRoleId } })
    .then( result => result );
    return newUserRole;
}

//function that returns users roles in Users table
async function getUsersRoles() {
    let usersRoles = await databaseModel.UserRoleSchema.find();

    return usersRoles;
}

//function that searches by user role id and returns a role id
async function getUserRoleBy( id ) {
    let userRole = await databaseModel.UserRoleSchema.find({ _id: id })
    .then( result => result );

    return userRole;
}

//function that deletes one user role by id
async function deleteUserRole( id ) {
    let deleteUserRole = await databaseModel.UserRoleSchema.deleteOne( { _id: id } )
    .then( result => result );

    return deleteUserRole;
}

//function that deletes one user role by id
async function clearUserRole( userId ) {
    let clearUserRoleId = await databaseModel.UserRoleSchema.deleteOne( { id_user: userId } )
    .then( result => result );

    return clearUserRoleId;
}

//function that returns users in Users table
async function getUsers() {
    let users = await databaseModel.Users.find();

    return users;
}

//function that returns order by id
async function getUserBy( userId ) {
    let user = await databaseModel.Users.find( { _id: userId } )
    .then( result => result );

    return user;
}


module.exports.clearUser = clearUser;
module.exports.clearUserRole = clearUserRole;
module.exports.searchUserByCredentials = searchUserByCredentials;
module.exports.findUserBy = findUserBy;
module.exports.getUsers = getUsers;
module.exports.getUsersRoles = getUsersRoles;
module.exports.getUserRoleBy = getUserRoleBy;
module.exports.deleteUserRole = deleteUserRole;
module.exports.getUserBy = getUserBy;
module.exports.getUserId = getUserId;
module.exports.getRoleIdBy = getRoleIdBy;
module.exports.insertUser = insertUser; 
module.exports.insertUserRole = insertUserRole;
module.exports.updateUser = updateUser;
module.exports.updateUserRole = updateUserRole;
module.exports.getUserUsername = getUserUsername;



