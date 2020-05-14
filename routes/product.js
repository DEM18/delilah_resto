const productController = require('../controllers/product');
const userController = require('../controllers/user');
const roleController = require('../controllers/rol');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSign = "mytokenpassword";
const router_product = express.Router();
const ROLE_ADMIN_DESCRIPTION = "Administrator";

router_product.post('/createfavorite', validateToken, validateUserRol, validateProperties, async ( req, res ) => {
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

router_product.get('/favorite', validateToken, validateUserRol, async ( req, res ) => {
    let favoriteProducts = await productController.getFavoriteProducts();

    if( favoriteProducts ) {
        res.statusCode = 200;
        res.json( favoriteProducts );
    }
});

router_product.get('/product', validateToken, validateUserRol, async ( req, res ) => {
    let products = await productController.getProducts();

    res.statusCode = 200;
    res.json( products );
});

router_product.post('/createproduct', validateToken, validateUserRol, validateProductProperties, async ( req, res ) => {
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

//function that validates if user has admin role
async function validateUserRol( req, res , next ) {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
        //find user id by username in Users table
        let rolDescription = await userController.getUserId( verifyToken )
        //find role id by user id in UserRole table
        .then( async (userId) => await userController.getRoleIdBy( userId )
            //find role description by role id 
            .then( async (roleId) => await roleController.getRoleby( roleId )
                .then( async (rolDesc) => rolDesc )
            )
        );
        if( rolDescription === ROLE_ADMIN_DESCRIPTION ) {
            next();
        } else {
            res.statusCode = 401;
            res.json("User not authorized");
        }
 
    } catch( error ) {
        res.statusCode = 401;
        res.json(error); 
  }
}

//function that validates properties sent by request 
function validateProperties( req, res, next ) {
    if( Array.isArray(req.body.products) && req.body.products.length ) {
        req.body.products.forEach( productId => {
            if( !productId ) {
                res.statusCode = 400;
                return res.json("Invalid properties");
            } 
        })
        next(); 
    } else {
    res.statusCode = 400;
    return res.json("Invalid properties");  
    }
}

//function that validates properties sent by request
function validateProductProperties( req, res , next ){
    const { name, image, price  } = req.body;

    if( name && image && price ) {
        next();
    } else {
        res.statusCode = 400;
        res.json("Invalid properties");
    }
}




module.exports = router_product;
