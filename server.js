const express = require('express');
const router = require('./routes/user');
const router_product = require('./routes/product');
const router_rol = require('./routes/rol');
const router_payment = require('./routes/paymentMethod');
const router_order_status = require('./routes/order');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.listen(3000, () => {
    console.log('iniciando servidor...');
});

server.use(router);
server.use(router_product);
server.use(router_rol);
server.use(router_payment);
server.use(router_order_status);



