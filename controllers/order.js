const databaseModel = require('../models/orders'); 

/*---- order -----*/

//function that inserts an order in Order table
async function insertOrder( order ) {
    const newOrder = new databaseModel.Order( order );

    let saveOrder = await newOrder.save();
    return saveOrder;
}

//function that returns orders in Order table
async function getOrders() {
    let orders = await databaseModel.Order.find();

    return orders;
}

//function that returns order by id
async function getOrderBy( orderId ) {
    let order = await databaseModel.Order.find( { _id: orderId } )
    .then( result => result );

    return order;

}

//function that deletes one order by id
async function deleteOrder( orderId ) {
    let deleteOrder = await databaseModel.Order.deleteOne( { _id: orderId } )
    .then( result => result );

    return deleteOrder;
}


//function that updates an order by id
async function updateOrder( orderId, orderStatus ) {
    let updateOrder = await databaseModel.Order.updateOne( { _id: orderId }, { $set: { order_status_id: orderStatus} })
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
module.exports.getOrderStatusBy = getOrderStatusBy;
module.exports.getOrdersStatus = getOrdersStatus;
module.exports.insertOrder = insertOrder;
module.exports.insertOrderStatus = insertOrderStatus;
module.exports.updateOrder = updateOrder;
module.exports.updateOrderStatus = updateOrderStatus;