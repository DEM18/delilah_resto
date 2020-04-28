const users = require('../entities/users');
const validateProperty = require('../library/validateproperty');

//function that look for user by username and password in database
function searchUserByCredentials( username, password ) {
    if( !username ) {
        return false;
    }
    for( let i = 0; i < users.length; i++ ) {
        if( (users[i].username === username || users[i].email === username) && users[i].password === password ) {
            return true;
        }
    }
    return false;
}

//function that search user for username and email in database
function findUserBy ( username, email ) {
    if( validateProperty.isValidProperty([ username, email ])) {
        for( let i = 0; i < users.length; i++ ) {
            if( users[i].username === username || users[i].email === email ) {
                return true;
            }
        }
        return false;
    } 
}

//function that inserts user in database.
function insertUserInDatabase( user ) {
    if( validateProperty.isValidProperty([{ ...user }] )) {
        users.push( user );
        return true;
    } 
    return false;
}


module.exports.insertUserInDatabase = insertUserInDatabase;
module.exports.searchUserByCredentials = searchUserByCredentials;
module.exports.findUserBy = findUserBy;


