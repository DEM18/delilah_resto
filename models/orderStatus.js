const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for order status table
const orderStatusSchema =  new mongoose.Schema({ 
    description: String, 
});


//create paymentMethod model from paymentMethodSchema
const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema); 


module.exports.OrderStatus = OrderStatus;