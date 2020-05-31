const rolController = require('../controllers/rol');
const userController = require('../controllers/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSign = "mytokenpassword";
const router_rol = express.Router();
const ROLE_ADMIN_DESCRIPTION = "Administrator";

router_rol.post('/createrole', validateRoleProperties, async ( req, res ) => {
    let saveRole = await rolController.insertRole( req.body );

    if( saveRole ) {
        res.statusCode = 200;  
        return res.json("role added sucessfully");
    }
     
});

router_rol.get('/role', validateToken, validateUserRol, async ( req, res ) => {
    let roles = await rolController.getRoles();

    res.statusCode = 200;
    res.json( roles );
});
router_rol.delete('/role/:id', validateToken, validateUserRol, async( req, res ) => {
    const roleId = req.params.id;

    let deleteRoleId = await rolController.deleteRole( roleId );

    if( deleteRoleId ) {
        res.statusCode = 200;
        res.json("rol deleted sucessfully");
    }
})
router_rol.get('/role/:id', validateToken, validateUserRol, async ( req, res ) => {
    const roleId = req.params.id;
    let rol = await rolController.getRolebyId( roleId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(rol);
    
});



router_rol.patch('/role/:id', validateToken, validateUserRol, validateRoleProperties, async ( req, res ) => {
    const roleId = req.params.id;
    const newRole = req.body;
   
    let updateRole = await rolController.updateRole( roleId, newRole );
    //Analyze if update was made sucessfully
    if( updateRole.ok === 1 ){
        res.statusCode = 200;
        res.json("role updated sucessfully");
    }
})



/*---- Middlewares -----*/

//function that validates properties sent by request
function validateRoleProperties(  req, res, next ) {
    const { description } = req.body;

    if( !description ) {
        res.statusCode = 400;
        res.json("Invalid properties");
    } else {
        next();
    }
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

//function that validates if user has admin role
async function validateUserRol( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
        //find user id by username in Users table
        let rolDescription = await userController.getUserId( verifyToken )
        //find role id by user id in UserRole table
        .then( async (userId) => await userController.getRoleIdBy( userId )
            //find role description by role id 
            .then( async (roleId) => await rolController.getRoleby( roleId )
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

module.exports = router_rol;