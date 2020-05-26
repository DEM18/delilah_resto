const mongoose = require('mongoose');
const userDatabaseModel = require('./Users'); 
const productDatabaseModel = require('./Products');
const paymentDatabaseModel = require('./paymentMethods'); 

mongoose.connect('mongodb://localhost:27017/database');

//create schema for order table
const orderSchema =  new mongoose.Schema({ 
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `${userDatabaseModel.Users}`
    },
    products_id: [
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
    total: Number,
    delivery_address: String
}); 
 

//create schema for order status table
const orderStatusSchema =  new mongoose.Schema({ 
    description: String, 
});

//create order status model from orderStatusSchema
const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);  
const Orders = mongoose.model("Orders", orderSchema);



module.exports.OrderStatus = OrderStatus;
module.exports.Orders = Orders; 
