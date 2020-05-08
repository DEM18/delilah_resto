const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for Products 
const ordersSchema =  new mongoose.Schema({ 
    order_number: Number, 
    username_id: Number,
    product_id: Number,
    payment_method_id: Number,
    status_id: Number
});

const ordersStatusSchema =  new mongoose.Schema({ 
    order_status_id: Number, 
    description: String
});

//create orders model from ordersSchema
const Orders = mongoose.model("Orders", ordersSchema); 

//create orders status model from ordersStatusSchema
const OrdersStatusSchema = mongoose.model("OrdersStatus", ordersStatusSchema);

module.exports.Orders = Orders;
module.exports.OrdersStatusSchema = OrdersStatusSchema;