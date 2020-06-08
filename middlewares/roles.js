const roleController = require('../controllers/role');
const userController = require('../controllers/user');
const jwtSign = "mytokenpassword";
const jwt = require('jsonwebtoken');

const ROLE_USER_DESCRIPTION = "User";
const ROLE_ADMIN_DESCRIPTION = "Administrator";


//function that validates if user has User role
async function validateRoleUser( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
        //find user id by username in Users table
        let rolDescription = await userController.getUserId( verifyToken )
        //find role id by user id in UserRole table
        .then( async (userId) => await userController.getRoleIdBy( userId )
            //find role description by role id 
            .then( async (roleId) => await roleController.getRoleDescription( roleId )
                .then( async (rolDesc) => rolDesc )
            )
        );
        if( rolDescription === ROLE_USER_DESCRIPTION ) {
            next();
        } else {
            res.statusCode = 401;
            return res.json("User not authorized");
        }
 
    } catch( error ) {
        res.statusCode = 401;
        return res.json(error); 
  }
}


//function that validates if user has Admin role
async function validateRoleAdmin( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
        //find user id by username in Users table
        let rolDescription = await userController.getUserId( verifyToken )
        //find role id by user id in UserRole table
        .then( async (userId) => await userController.getRoleIdBy( userId )
            //find role description by role id 
            .then( async (roleId) => await roleController.getRoleDescription( roleId )
                .then( async (rolDesc) => rolDesc )
            )
        );
        if( rolDescription === ROLE_ADMIN_DESCRIPTION ) {
            next();
        } else {
            res.statusCode = 401;
            res.json("User not authorized");
        }
 
    } catch( error ) {
        res.statusCode = 401;
        res.json(error); 
  }
}

module.exports.validateRoleUser = validateRoleUser;
module.exports.validateRoleAdmin = validateRoleAdmin;