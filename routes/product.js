server.get('/favorite', ( res ) => {
    res.statusCode = 200;
    res.json(product.getFavoriteProducts());
})

server.get('/product', ( res ) => {
    res.statusCode = 200;
    res.json( product.getProducts() );
});
