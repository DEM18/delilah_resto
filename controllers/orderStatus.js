const databaseModel = require('../models/orderStatus'); 

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


module.exports.deleteOrderStatus = deleteOrderStatus;
module.exports.getOrderStatusBy = getOrderStatusBy;
module.exports.getOrdersStatus = getOrdersStatus;
module.exports.insertOrderStatus = insertOrderStatus;
module.exports.updateOrderStatus = updateOrderStatus;