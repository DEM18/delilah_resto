const rolController = require('../controllers/rol');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSign = "mytokenpassword";
const router_rol = express.Router();

router_rol.post('/createrole', validateToken, validateRolProperties, async ( req, res ) => {
    let saveRole = await rolController.insertRole( req.body );

    if( saveRole ) {
        res.statusCode = 200;  
        return res.json("rol added sucessfully");
    }
     
});

router_rol.get('/role', validateToken,  async ( req, res ) => {
    let roles = await rolController.getRoles();

    res.statusCode = 200;
    res.json( roles );
});

router_rol.get('/role/:id', validateToken, async ( req, res ) => {
    const roleId = req.params.id;
    let rol = await rolController.getRoleby( roleId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(rol);
    
});

//function that validates properties sent by request
function validateRolProperties(  req, res, next ) {
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

module.exports = router_rol;