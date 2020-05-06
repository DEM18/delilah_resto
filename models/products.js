const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for Products 
const productsSchema =  new mongoose.Schema({ 
    name: String, 
    price: String,
    image: String,
});

//create products model from usersSchema
const Products = mongoose.model("Products", productsSchema); 

module.exports.Products = Products;