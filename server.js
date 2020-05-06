const express = require('express');
const router = require('./routes/user');
const router_product = require('./routes/product');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.listen(3000, () => {
    console.log('iniciando servidor...');
});

server.use(router);
server.use(router_product);



