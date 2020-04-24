const express = require('express');
const login = require('./repository/users_repository');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.listen(3000, () => {
    console.log('iniciando servidor...');
});

//endpoints 

server.post( '/login', validateCredentials, ( req, res ) => {
    const { username, password } = req.body;

    if( login.findUserBy( username, password )) {
        res.statusCode = 200;
        return res.json("Succesfull login");
    } else 
        res.statusCode = 404;
        return res.json("User not found");
});

//function that validates user credentials
function validateCredentials( req, res, next ) {
    const { username, password } = req.body;
    if( username === undefined || username  === null || username === "" ) {
        res.statusCode = 400;
        res.json("Invalid credentials");
    } else if( password === undefined || password === null || password === "" ){
        res.statusCode = 400;
        res.json("Invalid credentials");
    }
    next();
}