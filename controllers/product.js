const databaseModel = require('../models/Products'); 

//function that returns products in Product table
async function getProducts() {
    let products = await databaseModel.Products.find();

    return products;
}

//function that inserts  product in Product table
async function insertProduct( product ) {
    const newProduct = new databaseModel.Products( product );

    let saveProduct = await newProduct.save();
    return saveProduct;
}

//function that clears all documents in Favorite Products table
async function clearFavoriteDocuments() {
    let clearResult = await databaseModel.FavoriteProducts.deleteMany( {} )
    .then( result => result );

    return clearResult;
}
 
//function that validates if product exits in Products table.
async function validateProduct( products ) {
    let response = true;
    let i = 0;

    while( i < products.length && response ) {
        product = await databaseModel.Products.find({ _id: products[i]})
        .then( p => p);
        
        if( !product.length ) {
            response = false;
        }
        i++;
    }
    return response;
}

//function that inserts favorite product by ID
async function insertFavoriteProduct( productId ){
    let newProductId = { product: productId};
    const newFavoriteProduct = new databaseModel.FavoriteProducts( newProductId );
    let saveFavoriteProduct = await newFavoriteProduct.save();

    return saveFavoriteProduct;
}

//function that returns array of favorites products
async function getFavoriteProducts() {
    let favoriteProducts = await databaseModel.FavoriteProducts.find();

    return favoriteProducts;
}

module.exports.clearFavoriteDocuments = clearFavoriteDocuments;
module.exports.getProducts = getProducts;
module.exports.getFavoriteProducts = getFavoriteProducts;
module.exports.insertProduct = insertProduct;
module.exports.insertFavoriteProduct = insertFavoriteProduct;
module.exports.validateProduct = validateProduct;