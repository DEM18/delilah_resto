const express = require('express');
const login = require('./repository/users_repository');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());

server.listen(3000, () => {
    console.log('iniciando servidor');
});

/* login.getUsernameAndPassword( 'gomezl1', '12548930'); */

//APIs

//-----Login-----

server.post( '/login', ( req, res ) => {
    console.log( req.body );
    if( login.getUsernameAndPassword( req.body ) ) {
        console.log("PUEDE INICIAR SESION");
    } else console.log("NO PUEDE INICIAR SESION");

});