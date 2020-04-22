const express = require('express');
const login = require('./repository/users_repository');
const bodyParser = require('body-parser');
const server = express();
/* const NULL = "null"; */

server.use(bodyParser.json());

server.listen(3000, () => {
    console.log('iniciando servidor');
});


//-----Login-----

server.post( '/login', validateCredentials, ( req, res ) => {
    const { emailUsername, password } = req.body;
    if( res.statusCode === 200 ) {
        login.getUsernameAndPassword( emailUsername, password );
    }
});

function validateCredentials( req, res, next ) {
    const { emailUsername, password } = req.body;
    console.log( emailUsername, password );
    if( emailUsername === undefined || emailUsername  === null || emailUsername === "" ) {
        console.log('BAD REQUEST');
        res.statusCode = 400;
    } else if( password === undefined || password === null || password === "" ){
        console.log('BAD REQUEST');
        res.statusCode = 400;
    } else {
        console.log('OK REQUEST');  
        res.statusCode = 200;
        next();
    }
}