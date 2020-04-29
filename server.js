const express = require('express');
const user = require('./database/user');
const product = require('./database/product');
const users = require('./entities/users'); //luego sacar
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.listen(3000, () => {
    console.log('iniciando servidor...');
});

//EndpointsURL
//agrupar enpoints por usuario, producto..

server.post( '/login', validateCredentials, ( req, res ) => {
    const { username, password } = req.body;

    if( user.searchUserByCredentials( username, password )) {
        res.statusCode = 200;
        return res.json("Succesfull login");
    } else 
        res.statusCode = 400;
        return res.json("User not found");
});

server.post( '/register', validateProperties, ( req, res ) => {
    const { username, email } = req.body;

    if( !user.findUserBy(  username, email )) {
        if( user.insertUserInDatabase( req.body )){
            res.statusCode = 200;
            return res.json("User registered succefully");
        } 
    } else 
        res.statusCode = 404;
        return res.json("Username o email ya existente");
});

server.get('/product', ( res ) => {
    res.statusCode = 200;
    res.json( product.getProducts() );
});

server.get('/favorite', ( res ) => {
    res.statusCode = 200;
    res.json(product.getFavoriteProducts());
})

//Middlawares

//function that validates user credentials for login
function validateCredentials( req, res, next ) { 
    const { username, password } = req.body;
    if( !username || !password ) { 
        res.statusCode = 400;
        res.json("Invalid credentials");
    } 
    next();
}

//function that validates properties from register form
function validateProperties( req, res, next ) {
    const { username, name_lastname, email, telephone, delivery_address, password } = req.body;

    if( username && name_lastname && email && telephone && delivery_address && password ) {
        next();
    } else {
        res.statusCode = 400;
        res.json("Invalid properties");
    }
}

