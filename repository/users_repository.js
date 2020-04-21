const users = require('../entities/users');

function getUsernameAndPassword( credentials ) {
    const { password, username, userEmail  } = credentials;

    for( let i = 0; i < users.length; i++ ) {
        if( users[i].username === username || users[i].email === userEmail && users[i].password === password ) {
            console.log( 'existe user' );
            return true;
        }
    }
    console.log( 'No existe user' );
    return false;
}

module.exports.getUsernameAndPassword = getUsernameAndPassword;