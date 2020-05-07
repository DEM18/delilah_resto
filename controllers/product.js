const databaseModel = require('../models/Products'); 

//function that returns array of all products.
async function getProducts() {
    let products = await databaseModel.Products.find();

    return products;
}

async function insertProduct( product ) {
    const newProduct = new databaseModel.Products( product );

    let saveProduct = await newProduct.save();
    return saveProduct;
}

async function insertFavoriteProduct( productId ){
    const newFavoriteProduct = new databaseModel.FavoriteProducts( productId );

    let saveFavoriteProduct = await newFavoriteProduct.save();
    return saveFavoriteProduct;
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
module.exports.insertFavoriteProduct = insertFavoriteProduct;