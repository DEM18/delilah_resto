const databaseModel = require('../models/Products'); 

//function that returns array of all products.
function getProducts() {
    return products.products;
}

async function insertProduct( product ) {
    const newProduct = new databaseModel.Products( product );

    let saveProduct = await newProduct.save();
    return saveProduct;
}

//function that returns array of favorites products with its description, price and image.
function getFavoriteProducts() {
    let favoriteProducts = [];

    products.favorites.forEach( favoriteProduct => {
        products.products.forEach( product => {
            if( favoriteProduct.product_id === product.id ){
                favoriteProducts.push( product );
            }
        });
    });
    return favoriteProducts;
}

module.exports.getProducts = getProducts;
module.exports.getFavoriteProducts = getFavoriteProducts;

module.exports.insertProduct = insertProduct;