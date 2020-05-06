const productController = require('../controllers/product');
const express = require('express');
const router_product = express.Router();

router_product.get('/favorite', ( res ) => {
    res.statusCode = 200;
    res.json(product.getFavoriteProducts());
})

router_product.get('/product', ( res ) => {
    res.statusCode = 200;
    res.json( product.getProducts() );
});

router_product.post('/createproduct', async ( req, res ) => {
    console.log(req.body);
    let saveProduct = await productController.insertProduct( req.body );

    if( saveProduct ) {
        res.statusCode = 200;
        res.json("product added sucessfully");
    }
});

module.exports = router_product;