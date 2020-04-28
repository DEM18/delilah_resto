function isValidProperty( userProperties ) {
    userProperties.forEach( property => { 
        if( !property ) {
            return false;
        } 
    })
    return true;
}

module.exports.isValidProperty = isValidProperty;