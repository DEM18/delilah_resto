const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for paymentMethod table
const paymentMethodSchema =  new mongoose.Schema({ 
    description: String, 
});


//create paymentMethod model from paymentMethodSchema
const PaymentMethods = mongoose.model("paymentmethods", paymentMethodSchema, "paymentmethods"); 


module.exports.PaymentMethods = PaymentMethods;
