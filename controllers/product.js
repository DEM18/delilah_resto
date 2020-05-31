const databaseModel = require('../models/Products'); 

/*----- Product -----*/

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

//function that deletes one product by id
async function deleteProduct( id ) {
    let deleteProduct = await databaseModel.Products.deleteOne( { _id: id } )
    .then( result => result );

    return deleteProduct;
}

//function that updates a product by id
async function updateProduct( id, product ) {
    let updateProduct = await databaseModel.Products.updateOne( { _id: id }, { $set: product })
    .then( result => result);
    
    return updateProduct;
}

//function that receives a description and return its Id
 async function getProductBy( description ) {
    let productId = await databaseModel.Products.find({ name: description })
    .then( product => product[0]._id );

    return productId;
}
 
//function that receives an array of products description and return its Ids
async function getProductsIdBy ( products ) {
    let productsId = await products.map( async( description ) => {
     await getProductBy( description )
     .then( productId => productId )
 })
 return productsId;
} 


async function getProductPrice( productId ) {
    let productPrice = await databaseModel.Products.find({ _id: productId })
    .then( product => product[0].price );

    return productPrice;
    
}

//function that searches by product id and returns a product
async function getProductById( id ) {
    let product = await databaseModel.Products.find({ _id: id })
    .then( result => result );

    return product;
}

//function that searches by product id and returns a product description
async function getProductDescription( id ) {
    let productName = await databaseModel.Products.find({ _id: id })
    .then( result => result[0].name );
    return productName;
}

/*----- Favorite product -----*/

//function that clears all documents in Favorite Products table
async function clearFavoriteDocuments() {
    let clearResult = await databaseModel.FavoriteProducts.deleteMany( {} )
    .then( result => result );

    return clearResult;
}

//function that deletes one favorite Product by id
async function clearFavoriteProduct( id ) {
    let clearFavProduct = await databaseModel.FavoriteProducts.deleteOne( { _id: id } )
    .then( result => result );

    return clearFavProduct;
}

//function that searches and updates a Favorite Produt by id
async function updateFavorite( id, product ) {
    let updateFavorite = await databaseModel.FavoriteProducts.updateOne( { _id: id }, { $set: { product: product}})
    .then( result => result);
    
    return updateFavorite;
}

//function that searches product by id
async function findProductBy( productId ) {
    let product = await databaseModel.Products.find( { _id: productId } )
    .then( product => product );

    return product;
}

//function that searches favorite product id by product
async function findFavoriteProductId( product ) {
    let favoriteProdId = await databaseModel.FavoriteProducts.find( { product: product } )
    .then( result => result);
    
    return favoriteProdId;
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
module.exports.clearFavoriteProduct = clearFavoriteProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.findFavoriteProductId = findFavoriteProductId;
module.exports.findProductBy = findProductBy;
module.exports.getProducts = getProducts;
module.exports.getProductBy = getProductBy;
module.exports.getProductById = getProductById;
module.exports.getProductPrice = getProductPrice;
module.exports.getProductsIdBy = getProductsIdBy; 
module.exports.getFavoriteProducts = getFavoriteProducts;
module.exports.insertProduct = insertProduct;
module.exports.insertFavoriteProduct = insertFavoriteProduct;
module.exports.updateFavorite = updateFavorite;
module.exports.updateProduct = updateProduct;
module.exports.validateProduct = validateProduct;
module.exports.getProductDescription = getProductDescription;