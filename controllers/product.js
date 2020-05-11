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

async function clearDocuments() {
    let clearResult = await databaseModel.FavoriteProducts.deleteMany( {} )
    .then( result => result );

    return clearResult;
}
 
//function that finds product in database
async function existProduct( productId ) {
    let product = await databaseModel.Products.find({ _id: productId})
    .then( product => product );

    return product;
}

async function insertFavoriteProduct( productId ){
    if( !existProduct.length ) {
        let newProductId = { product: productId};
        const newFavoriteProduct = new databaseModel.FavoriteProducts( newProductId );
        let saveFavoriteProduct = await newFavoriteProduct.save();

    } else {
        console.log("el producto existe en la tabla ")
        return false;
    }

    /* return saveFavoriteProduct; */
}

//function that returns array of favorites products
async function getFavoriteProducts() {
    let favoriteProducts = await databaseModel.FavoriteProducts.find();

    return favoriteProducts;
}

module.exports.getProducts = getProducts;
module.exports.getFavoriteProducts = getFavoriteProducts;
module.exports.insertProduct = insertProduct;
module.exports.insertFavoriteProduct = insertFavoriteProduct;
module.exports.clearDocuments = clearDocuments;