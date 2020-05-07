/* const validateProperty = require('../library/validateproperty'); */
const databaseModel = require('../models/Users'); 

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
    const newUser = new databaseModel.Users( user ); //construye instancia newUser con propiedades del schema
    
    let saveUser = await newUser.save();
    return saveUser;
}



module.exports.searchUserByCredentials = searchUserByCredentials;
module.exports.findUserBy = findUserBy;
module.exports.insertUser = insertUser; 


