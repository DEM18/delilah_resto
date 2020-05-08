const productController = require('../controllers/product');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSign = "mytokenpassword";
const router_product = express.Router();

router_product.post('/createfavorite', async ( req, res ) => {
    let favoriteProduct = await productController.insertFavoriteProduct( req.body );

    if( favoriteProduct ) {
        res.statusCode = 200;
        res.json("favorite product added sucessfully");
    }
});

router_product.get('/favorite', async ( req, res ) => {
    let favoriteProducts = await productController.getFavoriteProducts();

    if( favoriteProducts ) {
        res.statusCode = 200;
        res.json( favoriteProducts );
    }
});

router_product.get('/product', validateToken, async ( req, res ) => {
    let products = await productController.getProducts();

    res.statusCode = 200;
    res.json( products );
});

router_product.post('/createproduct', async ( req, res ) => {
    let saveProduct = await productController.insertProduct( req.body );

    if( saveProduct ) {
        res.statusCode = 200;
        res.json("product added sucessfully");
    }
});

//function that verifies token generated
function validateToken( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );

        if( verifyToken ) {
            return next();
        } 
    } catch( error ) {
        res.statusCode = 401;
        res.json(error);
  }
}


module.exports = router_product;