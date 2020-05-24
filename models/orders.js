const mongoose = require('mongoose');
const userDatabaseModel = require('./users');
const productDatabaseModel = require('./products');
const paymentDatabaseModel = require('./paymentMethods');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for order table
const orderSchema =  new mongoose.Schema({ 
    username_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `${userDatabaseModel.Users}`
    },
    product_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `${productDatabaseModel.Products}` 
        }
    ],
    payment_method_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `${paymentDatabaseModel.PaymentMethods}`
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderStatus"
    }, 
    created: {
        type: Date,
        default: Date.now
    }
});

//create schema for order status table
const orderStatusSchema =  new mongoose.Schema({ 
    description: String, 
});

//create order status model from orderStatusSchema
const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema); 
//create order model from orderSchema
const Order = mongoose.model("Orders", orderSchema); 


module.exports.OrderStatus = OrderStatus;
module.exports.Order = Order;
