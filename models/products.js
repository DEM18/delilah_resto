const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

//create schema for products 
const productsSchema =  new mongoose.Schema({ 
    name: String, 
    price: String,
    image: String,
});

//create schema for favorite products
const favoriteProductsSchema =  new mongoose.Schema({ 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }
});

//create products model from ProductsSchema
const Products = mongoose.model("products", productsSchema, "products"); 
//create favorite products model from FavoriteProductsSchema
const FavoriteProducts = mongoose.model("favoriteproducts", favoriteProductsSchema, "favoriteproducts");

module.exports.Products = Products;
module.exports.FavoriteProducts = FavoriteProducts;