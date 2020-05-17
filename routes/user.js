const userController = require('../controllers/user');
const roleController = require('../controllers/rol');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtSign = "mytokenpassword";
const ROLE_USER_DESCRIPTION = "User";
const ROLE_ADMIN_DESCRIPTION = "Administrator";

router.post( '/login', validateCredentials, async ( req, res ) => {
    const { username, password } = req.body;
    let findUser = await userController.searchUserByCredentials( username, password );

    if( findUser.length ) {
        const token = jwt.sign( username, jwtSign );
        res.statusCode = 200;

        return res.json( token );
    } else {
        res.statusCode = 400;

        return res.json("User not found");
    } 
});

router.get('/user', validateToken, validateAdminRol, async ( req, res ) => {
    let users = await userController.getUsers();
    
    res.statusCode = 200;
    res.json( users );
});


router.post( '/register', validateProperties, async ( req, res ) => {
    const { username, email } = req.body;
    let findUser = await userController.findUserBy( username, email );

    if( !findUser.length ) {
        let saveUser = await userController.insertUser( req.body );

        if( saveUser ) {
            res.statusCode = 200;
            res.json("User succesfully registered");
        }
    } else {
        res.statusCode = 403;
        res.json("Username or email already exits");
    }
});

router.patch('/user/:id', validateToken, validateUserRol, validateUpdateProperties, async ( req, res ) => {
    const idUser = req.params.id;
    const updateUuser = req.body;
   
 let updateUser = await userController.updateUser( idUser, updateUuser );
    //Analyze if update was made sucessfully
    if( updateUser.ok === 1 ){
        res.statusCode = 200;
        res.json("user updated sucessfully");
    } 
    
    if ( !updateUser ) {
        res.statusCode = 403;
        res.json("Username or email already exits");
    }

});

router.delete('/user/:id', validateToken, validateAdminRol, async( req, res ) => {
    const userId = req.params.id;

    let deleteUserId = await userController.clearUser( userId );

    if( deleteUserId.ok === 1 ) {
        let deleteUserRoleId = await userController.clearUserRole( userId );
        res.statusCode = 200;
        res.json("user and user role deleted sucessfully");
    }
})

router.patch('/userrole/:id', validateToken, validateAdminRol, validateUpdateUserRoleProps,  async ( req, res ) => {
    const idUser = req.params.id;
    const updateUserRoleId = req.body.id_rol;
   
 let updateUser = await userController.updateUserRole( idUser, updateUserRoleId );
    //Analyze if update was made sucessfully
    if( updateUser.ok === 1 ){
        res.statusCode = 200;
        res.json("user role updated sucessfully");
    } 
})


//function that validates properties sent by request
function validateProperties( req, res, next ) {
    const { username, name_lastname, email, telephone, delivery_address, password } = req.body;

    if( username && name_lastname && email && telephone && delivery_address && password ) {
        next();
    } else {
        res.statusCode = 400;
        res.json("Invalid properties");
    }
}

//function that validates properties sent by request 
function validateUpdateProperties( req, res, next ) {
   for( let i = 0 ; i < Object.entries( req.body ).length; i++  ) {
        if( !Object.entries ( req.body )[i][1]) {
            res.statusCode = 400;
            return res.json("invalid properties");
        }
    }
    next();
}

//function that validates properties sent by request 
function validateUpdateUserRoleProps(  req, res, next ) {
    if( !req.body.id_user ) {
        res.statusCode = 400;
        res.json("Invalid properties");
    } else {
        next();
    }
}

//function that validates user credentials for login
function validateCredentials( req, res, next ) { 
    const { username, password } = req.body;
    if( !username || !password ) { 
        res.statusCode = 400;
        res.json("Invalid credentials");
    } 
    next();
}

//function that verifies token generated
function validateToken( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );

        if( verifyToken ) {
            return next();
        } 
    } catch( error ) {
        res.statusCode = 401;
        res.json(error);
  }
}

//function that validates if user has User role
async function validateUserRol( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
        //find user id by username in Users table
        let rolDescription = await userController.getUserId( verifyToken )
        //find role id by user id in UserRole table
        .then( async (userId) => await userController.getRoleIdBy( userId )
            //find role description by role id 
            .then( async (roleId) => await roleController.getRoleby( roleId )
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
async function validateAdminRol( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
        //find user id by username in Users table
        let rolDescription = await userController.getUserId( verifyToken )
        //find role id by user id in UserRole table
        .then( async (userId) => await userController.getRoleIdBy( userId )
            //find role description by role id 
            .then( async (roleId) => await roleController.getRoleby( roleId )
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



module.exports = router;
module.exports.jwtSign = jwtSign;