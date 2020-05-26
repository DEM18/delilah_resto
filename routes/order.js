const userController = require('../controllers/user');
const orderController = require('../controllers/order');
const rolController = require('../controllers/rol');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSign = "mytokenpassword";
const router_order = express.Router();
const ROLE_ADMIN_DESCRIPTION = "Administrator";
const ROLE_USER_DESCRIPTION = "User";

router_order.post('/order', validateToken, validateUserRol, validateOrderProps, async ( req, res ) => {
     let saveOrder = await orderController.insertOrder( req.body );

    if( saveOrder ) {
        res.statusCode = 200;  
        return res.json("order status added sucessfully");
    } 
});

router_order.patch('/order/:id', validateToken, validateRoleAdmin, validateUpdateOrderProps, async ( req, res ) => {
    const orderId = req.params.id;

    let updateOrderId = await orderController.updateOrder( orderId, req.body.status_id );
    //Analyze if update was made sucessfully
    if( updateOrderId.ok === 1 ){
        res.statusCode = 200;
        res.json("Order status updated sucessfully");
    }
});

router_order.delete('/order/:id', validateToken, validateRoleAdmin, async( req, res ) => {
    const orderId = req.params.id;

    let deleteOrder = await orderController.deleteOrder( orderId );

    if( deleteOrder ) {
        res.statusCode = 200;
        res.json("Order status deleted sucessfully");
    }
});

router_order.get('/order', validateToken, validateRoleAdmin,  async ( req, res ) => {
    let orders = await orderController.getOrders();
      
    let newOrders = [];
    for( let i = 0; i <orders.length; i++ ) {
        let user = await userController.getUserBy(orders[i].id_user);
        newOrders.push({
            products_id: orders[i].products_id,
            id_user: orders[i].id_user,
            payment_method_id: orders[i].payment_method_id,
            status_id: orders[i].status_id,
            total: orders[i].total,
            delivery_address: orders[i].delivery_address,
            username: user[0].username,
            name_lastname: user[0].name_lastname,
            user_email: user[0].email,
            user_telephone: user[0].telephone,
            user_address: user[0].delivery_address,
        })
    }
    res.statusCode = 200;
    return res.json(newOrders);  
});

router_order.get('/order/:id', validateToken, validateRoleAdmin, async ( req, res ) => {
    const orderId  = req.params.id;

    let order = await orderController.getOrderBy( orderId )
    .then( result => result );

    let newOrder = [];
    let user = await userController.getUserBy(order[0].id_user);

    newOrder.push({
        products_id: order[0].products_id,
        id_user: order[0].id_user,
        payment_method_id: order[0].payment_method_id,
        status_id: order[0].status_id,
        total: order[0].total,
        delivery_address: order[0].delivery_address,
        username: user[0].username,
        name_lastname: user[0].name_lastname,
        user_email: user[0].email,
        user_telephone: user[0].telephone,
        user_address: user[0].delivery_address,
        })

    res.statusCode = 200;
    return res.json(newOrder);  
});

router_order.get('/myorder', validateToken, validateUserRol, async ( req, res ) => {
     try {  
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
        //find user id by username in Users table
        let orders = await userController.getUserId( verifyToken )
            .then( async( userId ) => await orderController.getMyOrders( userId )
                .then( order => order ) );
        
        let newOrders = [];
        for( let i = 0; i <orders.length; i++ ) {
            newOrders.push({
                products_id: orders[i].products_id,
                id_user: orders[i].id_user,
                payment_method_id: orders[i].payment_method_id,
                status_id: orders[i].status_id,
                total: orders[i].total,
                delivery_address: orders[i].delivery_address
            })
        }
        res.statusCode = 200;
        return res.json(newOrders);  

    } catch( error ) {
        res.statusCode = 401;
        return res.json(error); 
  } 
});

 router_order.get('/myorder/:id', validateToken, validateUserRol, async ( req, res ) => {
    const orderId  = req.params.id;
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );

        let userId = await userController.getUserId( verifyToken );
        let order = await orderController.getOrderBy( orderId );

        if(order[0].id_user.toString() === userId.toString() ) {
            res.statusCode = 200;
            return res.json( order ); 
        } 
        res.statusCode = 401;
        return res.json("User not authorized");
    
    } catch( error ) {
        res.statusCode = 401;
        return res.json(error); 
  }
});



/*----- order status ----*/

router_order.post('/createstatus', validateToken, validateUserRol, validateStatusProps, async ( req, res ) => {
    let saveOrderStatus = await orderController.insertOrderStatus( req.body );

    if( saveOrderStatus ) {
        res.statusCode = 200;  
        return res.json("order status added sucessfully");
    }
     
});
 
router_order.get('/status', validateToken, validateUserRol, async ( req, res ) => {
    let ordersStatus = await orderController.getOrdersStatus();

    res.statusCode = 200;
    res.json( ordersStatus );
});

router_order.get('/status/:id', validateToken, validateUserRol, async ( req, res ) => {
    const statusId = req.params.id;
    let status = await orderController.getOrderStatusBy( statusId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(status);
    
});

router_order.delete('/status/:id', validateToken, validateUserRol, async( req, res ) => {
    const statusId = req.params.id;

    let deleteStatus = await orderController.deleteOrderStatus( statusId );

    if( deleteStatus ) {
        res.statusCode = 200;
        res.json("Order status deleted sucessfully");
    }
})

router_order.patch('/status/:id', validateStatusProps, validateToken, validateUserRol, async ( req, res ) => {
    const statusId = req.params.id;

    let updateStatusId = await orderController.updateOrderStatus( statusId, req.body.description );
    //Analyze if update was made sucessfully
    if( updateStatusId.ok === 1 ){
        res.statusCode = 200;
        res.json("Order status updated sucessfully");
    }
})


/*---- Middlewares -----*/

//function that validates properties sent by request
function validateStatusProps(  req, res, next ) {
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
async function validateRoleAdmin( req, res , next ) {
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

//function that validates if user has User role
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
        if( rolDescription === ROLE_USER_DESCRIPTION ) {
            next();
        } else {
            res.statusCode = 401;
            return res.json("User not authorized");
        }
 
    } catch( error ) {
        res.statusCode = 401;
        return res.json(error); 
  }
}

//function that validates properties sent by request
function validateOrderProps(  req, res, next ) {
    const { productsId, usernameId, payment_methodId, delivery_address } = req.body;
    if( !productsId || !usernameId || !payment_methodId || !delivery_address || !Array.isArray(req.body.productsId) || !req.body.productsId.length  ) {
        res.statusCode = 400;
        res.json("Invalid properties");
    } else {
        next();
    }
}

//function that validates properties sent by request
function validateUpdateOrderProps(  req, res, next ) {
    const { status_id } = req.body;

    if( !status_id ) {
        res.statusCode = 400;
        res.json("Invalid properties");
    } else {
        next();
    }
}



module.exports = router_order;