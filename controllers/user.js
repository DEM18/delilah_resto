const databaseModel = require('../models/Users'); 
const rolController = require('../controllers/rol');
const ROLE_USER_DESCRIPTION = "User" ;

//function that look for user by username or email and password in database
async function searchUserByCredentials( username, password ) {
    let user = await databaseModel.Users.find( { $and: [ { $or: [ { username: username }, { email: username } ]}, { password: password}]})
    .then(user => user);

    return user;
}

//function that search user for username and email in database
async function findUserBy ( username, email ) {
   let user = await databaseModel.Users.find({ $or: [ { username: username }, { email: email } ]})
    .then( user => user );

    return user;
}

//function that inserts user into database
async function insertUser( user ) {
    const newUser = new databaseModel.Users( user ); 
    
    let saveUserId = await newUser.save()
    .then(user => user._id);

    let rolUserId = await rolController.getRoleDescriptionId( ROLE_USER_DESCRIPTION )
    .then( result => result);

    let userRole = {
        id_user: saveUserId,
        id_rol: rolUserId
    }

    let saveUserRole = await insertUserRole( userRole )
    .then( result => result );

    return saveUserId;
}

//function that inserts userid with a roleid
async function insertUserRole( userRole ) {
    const newUserRole = new databaseModel.UserRoleSchema( userRole ); 
    
    let saveUserRole = await newUserRole.save();
    return saveUserRole;
}



module.exports.searchUserByCredentials = searchUserByCredentials;
module.exports.findUserBy = findUserBy;
module.exports.insertUser = insertUser; 
module.exports.insertUserRole = insertUserRole; 


