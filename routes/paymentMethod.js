const userController = require('../controllers/user');
const paymentController = require('../controllers/paymentMethod');
const rolController = require('../controllers/rol');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSign = "mytokenpassword";
const router_payment = express.Router();
const ROLE_ADMIN_DESCRIPTION = "Administrator";

router_payment.post('/createpayment', validatePaymentProps, validateToken, validateUserRol, async ( req, res ) => {
    let savePayment = await paymentController.insertPaymentMethod( req.body );

    if( savePayment ) {
        res.statusCode = 200;  
        return res.json("payment added sucessfully");
    }
     
});

router_payment.get('/paymentmethod', validateToken, validateUserRol, async ( req, res ) => {
    let paymentMethods = await paymentController.getPaymentMethods();

    res.statusCode = 200;
    res.json( paymentMethods );
});

router_payment.get('/payment/:id', validateToken, validateUserRol,  async ( req, res ) => {
    const paymentId = req.params.id;
    let payment = await paymentController.getPaymentMethodBy( paymentId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(payment);
    
});

router_payment.delete('/payment/:id', validateToken, validateUserRol,  async( req, res ) => {
    const paymentId = req.params.id;

    let deletePayment = await paymentController.deletePaymentMethod( paymentId );

    if( deletePayment ) {
        res.statusCode = 200;
        res.json("payment method deleted sucessfully");
    }
})

router_payment.patch('/payment/:id', validatePaymentProps, validateToken, validateUserRol, async ( req, res ) => {
    const paymentId = req.params.id;

    let updatePayment = await paymentController.updatePaymentMethod( paymentId, req.body.description );
    //Analyze if update was made sucessfully
    if( updatePayment.ok === 1 ){
        res.statusCode = 200;
        res.json("payment updated sucessfully");
    }
})


/*---- Middlewares -----*/

//function that validates properties sent by request
function validatePaymentProps(  req, res, next ) {
    const { description } = req.body;

    if( !description ) {
        res.statusCode = 400;
        res.json("Invalid properties");
    } else {
        next();
    }
}


//function that verifies token generated
function validateToken( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );

        if( verifyToken ) {
            return next();
        } 
    } catch( error ) {
        res.statusCode = 401;
        res.json(error);
  }
}

//function that validates if user has admin role
async function validateUserRol( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
        //find user id by username in Users table
        let rolDescription = await userController.getUserId( verifyToken )
        //find role id by user id in UserRole table
        .then( async (userId) => await userController.getRoleIdBy( userId )
            //find role description by role id 
            .then( async (roleId) => await rolController.getRoleby( roleId )
                .then( async (rolDesc) => rolDesc )
            )
        );
        if( rolDescription === ROLE_ADMIN_DESCRIPTION ) {
            next();
        } else {
            res.statusCode = 401;
            res.json("User not authorized");
        }
 
    } catch( error ) {
        res.statusCode = 401;
        res.json(error); 
  }
}


module.exports = router_payment;