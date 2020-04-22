const express = require('express');
const login = require('./repository/users_repository');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());

server.listen(3000, () => {
    console.log('iniciando servidor...');
});


//-----Login-----

server.post( '/login', validateCredentials, ( req, res ) => {
    const { emailUsername, password } = req.body;

    if( login.findUserBy( emailUsername, password )) {
        res.statusCode = 200;
        console.log("EXITOS");
        return res.json("Succesfull Log in");
    } else 
        res.statusCode = 404;
        console.log("NO EXITOS");
        return res.json("User not found");
});

function validateCredentials( req, res, next ) {
    const { emailUsername, password } = req.body;
    if( emailUsername === undefined || emailUsername  === null || emailUsername === "" ) {
        res.statusCode = 400;
        res.json("Invalid username or email");
    } else if( password === undefined || password === null || password === "" ){
        res.statusCode = 400;
        res.json("Invalid password");
    }
    next();
}