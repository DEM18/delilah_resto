const rolController = require('../controllers/rol');
const express = require('express');
const router_rol = express.Router();

router_rol.post('/createrole', validateRolProperties, async ( req, res ) => {
    let saveRole = await rolController.insertRole( req.body );

    if( saveRole ) {
        res.statusCode = 200;  
        return res.json("rol added sucessfully");
    }
     
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


module.exports = router_rol;