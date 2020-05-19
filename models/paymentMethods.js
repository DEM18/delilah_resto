const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for paymentMethod table
const paymentMethodSchema =  new mongoose.Schema({ 
    description: String, 
});


//create paymentMethod model from paymentMethodSchema
const PaymentMethods = mongoose.model("PaymentMethods", paymentMethodSchema); 


module.exports.PaymentMethods = PaymentMethods;
