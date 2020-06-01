const express = require('express');
const router_product = express.Router();

const productController = require('../controllers/product');

const productMiddleware = require('../middlewares/product');
const rolesMiddleware = require('../middlewares/roles');
const tokenMiddleware = require('../middlewares/token');


/*------- Favorite Product ----------*/

router_product.post('/favorite', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, productMiddleware.validatePostFavorite, async ( req, res ) => {
    let clearResult = await productController.clearFavoriteDocuments();
    //clear favorite table before insert new one
    if( clearResult.ok === 1 ) {
        //validate previously if product exists in Product table
        let existProducts = await productController.validateProduct( req.body.products );
            if( existProducts ) {
                req.body.products.forEach( async (productId) => {
                    await productController.insertFavoriteProduct( productId );
                 });
                res.statusCode = 200;
                return res.json("favorite products added sucessfully"); 
            } 
        res.statusCode = 400;
        return res.json("favorite product already exists"); 
    }
});

router_product.get('/favorite', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let favoriteProducts = await productController.getFavoriteProducts();

    let newFavorites = [];
    for( let i = 0; i < favoriteProducts.length; i ++ ){
        let favoriteDesc = await productController.getProductDescription( favoriteProducts[i].product );

        newFavorites.push({
            _id: favoriteProducts[i]._id,
            favorites_description: favoriteDesc
            })
    }
 
        res.statusCode = 200;
        res.json( newFavorites ); 
});

router_product.delete('/favorite/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const favoriteId = req.params.id;

    let deleteFavoriteId = await productController.clearFavoriteProduct( favoriteId );

    if( deleteFavoriteId ) {
        res.statusCode = 200;
        res.json("favorite product deleted sucessfully");
    }
})

/*------- Product ----------*/

router_product.get('/product', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let products = await productController.getProducts();

    res.statusCode = 200;
    res.json( products );
});

router_product.post('/createproduct', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, productMiddleware.validatePostProduct, async ( req, res ) => {
    let saveProduct = await productController.insertProduct( req.body );

    if( saveProduct ) {
        res.statusCode = 200;
        res.json("product added sucessfully");
    }
});

router_product.delete('/product/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const productId = req.params.id;

    let deleteProductId = await productController.deleteProduct( productId );

    if( deleteProductId ) {
        res.statusCode = 200;
        res.json("product deleted sucessfully");
    }
})

router_product.patch('/product/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, productMiddleware.validateUpdateProduct, async ( req, res ) => {
    const productId = req.params.id;
    const newProperties = req.body;
   
    let updateProduct = await productController.updateProduct( productId, newProperties );
    //Analyze if update was made sucessfully
    if( updateProduct.ok === 1 ){
        res.statusCode = 200;
        res.json("product updated sucessfully");
    }
})

router_product.get('/product/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    const productId = req.params.id;
    let product = await productController.getProductById( productId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(product);
    
});


module.exports = router_product;
