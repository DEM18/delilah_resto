const express = require('express');
const router_payment = express.Router();

const paymentController = require('../controllers/paymentMethod');
const paymentMiddleware = require('../middlewares/paymentMethod');
const rolesMiddleware = require('../middlewares/roles');
const tokenMiddleware = require('../middlewares/token');


router_payment.post('/paymentmethod', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, paymentMiddleware.validatePaymentProps, async ( req, res ) => {
    let savePayment = await paymentController.insertPaymentMethod( req.body );

    if( savePayment ) {
        res.statusCode = 200;  
        return res.json("payment added sucessfully");
    }
     
});

router_payment.get('/paymentmethod', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let paymentMethods = await paymentController.getPaymentMethods();

    res.statusCode = 200;
    res.json( paymentMethods );
});

router_payment.get('/payment/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin,  async ( req, res ) => {
    const paymentId = req.params.id;
    let payment = await paymentController.getPaymentMethodBy( paymentId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(payment);
    
});

router_payment.delete('/payment/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin,  async( req, res ) => {
    const paymentId = req.params.id;

    let deletePayment = await paymentController.deletePaymentMethod( paymentId );

    if( deletePayment ) {
        res.statusCode = 200;
        res.json("payment method deleted sucessfully");
    }
})

router_payment.patch('/payment/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, paymentMiddleware.validatePaymentProps, async ( req, res ) => {
    const paymentId = req.params.id;

    let updatePayment = await paymentController.updatePaymentMethod( paymentId, req.body.description );
    //Analyze if update was made sucessfully
    if( updatePayment.ok === 1 ){
        res.statusCode = 200;
        res.json("payment updated sucessfully");
    }
})


module.exports = router_payment;