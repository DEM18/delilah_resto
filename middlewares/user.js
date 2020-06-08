//function that validates properties sent by request
function validatePostUser( req, res, next ) {
    const { username, name_lastname, email, telephone, delivery_address, password } = req.body;

    if( username && name_lastname && email && telephone && delivery_address && password ) {
        next();
    } else {
        res.statusCode = 400;
        res.json("Invalid properties");
    }
}

//function that validates user credentials for login
function loginValidation( req, res, next ) { 
    const { username, password } = req.body;
    if( !username || !password ) { 
        res.statusCode = 400;
        res.json("Invalid credentials");
    } 
    next();
}

//function that validates properties sent by request 
function validatePatchUser( req, res, next ) {
    for( let i = 0 ; i < Object.entries( req.body ).length; i++  ) {
         if( !Object.entries ( req.body )[i][1]) {
             res.statusCode = 400;
             return res.json("invalid properties");
         }
     }
     next();
 }
 
//function that validates properties sent by request 
function validatePatchUserRole(  req, res, next ) {
    if( !req.body.id_role ) {
        res.statusCode = 400;
        res.json("Invalid properties");
    } else {
        next();
    }
}





module.exports.loginValidation = loginValidation;
module.exports.validatePatchUser = validatePatchUser;
module.exports.validatePatchUserRole = validatePatchUserRole;
module.exports.validatePostUser = validatePostUser;