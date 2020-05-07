const userController = require('../controllers/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const firma = "mytokenpassword";

router.post( '/login', validateCredentials, async ( req, res ) => {
    const { username, password } = req.body;
    let findUser = await userController.searchUserByCredentials( username, password );

    if( findUser.length ) {
        const token = jwt.sign( username, firma );
        res.statusCode = 200;

        return res.json( token );
    } else {
        res.statusCode = 400;

        return res.json("User not found");
    } 
});


//function that validates user credentials for login
function validateCredentials( req, res, next ) { 
    const { username, password } = req.body;
    if( !username || !password ) { 
        res.statusCode = 400;
        res.json("Invalid credentials");
    } 
    next();
}


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

function validateProperties( req, res, next ) {
    const { username, name_lastname, email, telephone, delivery_address, password } = req.body;

    if( username && name_lastname && email && telephone && delivery_address && password ) {
        next();
    } else {
        res.statusCode = 400;
        res.json("Invalid properties");
    }
}

module.exports = router;