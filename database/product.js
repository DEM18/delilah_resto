const products = require('../entities/products');

//function that returns array of all products.
function getProducts() {
    return products.products;
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
