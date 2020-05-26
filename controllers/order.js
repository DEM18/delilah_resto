const databaseModel = require('../models/orders');
const userController = require('../controllers/user'); 
const productController = require('../controllers/product');
const paymentController = require('../controllers/paymentMethod');
const ORDER_STATUS_NUEVO = "Nuevo"; 

/*---- order -----*/

//function that inserts an order in Order table
async function insertOrder( order ) {
    const { usernameId, productsId, payment_methodId, delivery_address } = order;
    let total = 0;

    const newStatusId = await getStatusDescriptionId( ORDER_STATUS_NUEVO );

    for( i = 0; i<productsId.length; i++) {
        let productPrice = await productController.getProductPrice( productsId[i])
            .then(price => price);

        total = total + parseInt(productPrice) ;
    }

     let orderDescription = {
        id_user : usernameId,
        products_id : productsId,
        payment_method_id : payment_methodId,
        status_id : newStatusId,
        total: total,
        delivery_address: delivery_address
    }
    
    const newOrder = new databaseModel.Orders( orderDescription );
    let saveOrder = await newOrder.save();

    return saveOrder;   
}

//function that returns orders in Order table
async function getOrders() {
    let orders = await databaseModel.Orders.find();

    return orders;
}

//function that returns order by id
async function getOrderBy( orderId ) {
    let order = await databaseModel.Orders.find( { _id: orderId } )
    .then( result => result );

    return order;
}

//function that returns an order for a user id
async function getMyOrders( userId ) {
    let order = await databaseModel.Orders.find( { id_user: userId } )
    .then( result => result );
    
    return order;
}

//function that deletes one order by id
async function deleteOrder( orderId ) {
    let deleteOrder = await databaseModel.Orders.deleteOne( { _id: orderId } )
    .then( result => result );

    return deleteOrder;
}

//function that updates an order status by id
async function updateOrder( orderId, orderStatusId ) {
    let updateOrder = await databaseModel.Orders.updateOne( { _id: orderId }, { $set: { status_id: orderStatusId} })
    .then( result => result);
    
    return updateOrder;
}

 /*--- order status --------*/

//function that inserts an order status in OrderStatus table
async function insertOrderStatus( orderStatus ) {
    const newOrderStatus = new databaseModel.OrderStatus( orderStatus );

    let saveOrderStatus = await newOrderStatus.save();
    return saveOrderStatus;
}

//function that returns orders status in OrderStatus table
async function getOrdersStatus() {
    let ordersStatus = await databaseModel.OrderStatus.find();

    return ordersStatus;
}

//function that returns order status by id
async function getOrderStatusBy( orderStatusId ) {
    let orderStatus = await databaseModel.OrderStatus.find( { _id: orderStatusId } )
    .then( result => result );

    return orderStatus;

}

//function that returns a status id by its description
async function getStatusDescriptionId( description ) {
    let statusId = await databaseModel.OrderStatus.find({ description: description })
    .then( status => status[0]._id );

    return statusId;
}

//function that deletes one order status by id
async function deleteOrderStatus( orderStatusId ) {
    let deleteOrderStatus = await databaseModel.OrderStatus.deleteOne( { _id: orderStatusId } )
    .then( result => result );

    return deleteOrderStatus;
}

//function that updates an order status by id
async function updateOrderStatus( orderStatusId, description ) {
    let updateOrderStatus = await databaseModel.OrderStatus.updateOne( { _id: orderStatusId }, { $set: { description: description} })
    .then( result => result);
    
    return updateOrderStatus;
}


module.exports.deleteOrder = deleteOrder;
module.exports.deleteOrderStatus = deleteOrderStatus; 
module.exports.getOrders = getOrders;
module.exports.getOrderBy = getOrderBy;
module.exports.getMyOrders = getMyOrders;
module.exports.getOrderStatusBy = getOrderStatusBy;
module.exports.getOrdersStatus = getOrdersStatus;
module.exports.getStatusDescriptionId = getStatusDescriptionId;
module.exports.insertOrder = insertOrder; 
module.exports.insertOrderStatus = insertOrderStatus;
module.exports.updateOrder = updateOrder;
module.exports.updateOrderStatus = updateOrderStatus;