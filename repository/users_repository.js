const users = require('../entities/users');

function findUserBy( emailUsername, password ) {
    if( emailUsername === undefined || emailUsername === null ) {
        return false;
    }
    
    for( let i = 0; i < users.length; i++ ) {
        if( (users[i].username === emailUsername || users[i].email === emailUsername) && users[i].password === password ) {
            return true;
        }
    }
    return false;
}

module.exports.findUserBy = findUserBy;