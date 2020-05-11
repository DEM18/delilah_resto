const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for Products 
const productsSchema =  new mongoose.Schema({ 
    name: String, 
    price: String,
    image: String,
});

//create schema for favorite products
const favoriteProductsSchema =  new mongoose.Schema({ 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    }
});

//create products model from usersSchema
const Products = mongoose.model("Products", productsSchema); 
const FavoriteProducts = mongoose.model("FavoriteProducts", favoriteProductsSchema);

module.exports.Products = Products;
module.exports.FavoriteProducts = FavoriteProducts;