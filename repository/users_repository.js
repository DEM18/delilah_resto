const users = require('../entities/users');

//function that look for user by username and password in database
function findUserBy( username, password ) {
    if( username === undefined || username === null ) {
        return false;
    }
    
    for( let i = 0; i < users.length; i++ ) {
        if( (users[i].username === username || users[i].email === username) && users[i].password === password ) {
            return true;
        }
    }
    return false;
}

module.exports.findUserBy = findUserBy;