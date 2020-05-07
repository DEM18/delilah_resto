const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for Products 
const productsSchema =  new mongoose.Schema({ 
    name: String, 
    price: String,
    image: String,
});

const favoriteProductsSchema =  new mongoose.Schema({ 
    product_id: Number, 
});

//create products model from usersSchema
const Products = mongoose.model("Products", productsSchema); 
const FavoriteProducts = mongoose.model("FavoriteProducts", favoriteProductsSchema);

module.exports.Products = Products;
module.exports.FavoriteProducts = FavoriteProducts;