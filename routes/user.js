
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

const userMiddleware = require('../middlewares/user');
const tokenMiddleware = require('../middlewares/token');
const rolesMiddleware = require('../middlewares/roles');

const jwt = require('jsonwebtoken');
const jwtSign = "mytokenpassword";



router.post( '/login', userMiddleware.loginValidation, async ( req, res ) => {
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

router.get('/user', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let users = await userController.getUsers();
    
    res.statusCode = 200;
    res.json( users );
});

router.post( '/register', userMiddleware.validatePostUser, async ( req, res ) => {
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

router.patch('/user/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleUser, userMiddleware.validatePatchUser, async ( req, res ) => {
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

router.delete('/user/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const userId = req.params.id;

    let deleteUserId = await userController.clearUser( userId );

    if( deleteUserId.ok === 1 ) {
        let deleteUserRoleId = await userController.clearUserRole( userId );
        res.statusCode = 200;
        res.json("user deleted sucessfully");
    }
})

/*--- User role ----*/

router.patch('/user/role/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, userMiddleware.validatePatchUserRole,  async ( req, res ) => {
    const idUser = req.params.id;
    const updateUserRoleId = req.body.id_rol;
   
 let updateUser = await userController.updateUserRole( idUser, updateUserRoleId );
    //Analyze if update was made sucessfully
    if( updateUser.ok === 1 ){
        res.statusCode = 200;
        res.json("user role updated sucessfully");
    } 
});

router.get('/user/role', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let userRoles = await userController.getUsersRoles();

    res.statusCode = 200;
    res.json( userRoles );
});

router.get('/user/role/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    const userRoleId = req.params.id;
    let userRole = await userController.getUserRoleBy( userRoleId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(userRole);
    
});

router.delete('/user/role/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const userRoleId = req.params.id;

    let deleteUserRoleId = await userController.deleteUserRole( userRoleId );

    if( deleteUserRoleId ) {
        res.statusCode = 200;
        res.json("user role deleted sucessfully");
    }
})


module.exports = router;
