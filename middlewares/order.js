
//function that validates properties sent by request
function validatePostOrder(  req, res, next ) {
    const { productsId, usernameId, payment_methodId, delivery_address } = req.body;
    if( !productsId || !usernameId || !payment_methodId || !delivery_address || !Array.isArray(req.body.productsId) || !req.body.productsId.length  ) {
        res.statusCode = 400;
        res.json("invalid properties");
    } else {
        next();
    }
}


//function that validates properties sent by request
function validateUpdateOrder(  req, res, next ) {
    const { status_id } = req.body;

    if( !status_id ) {
        res.statusCode = 400;
        res.json("invalid properties");
    } else {
        next();
    }
}

//function that validates properties sent by request
function validateStatusOrderProps(  req, res, next ) {
    const { description } = req.body;

    if( !description ) {
        res.statusCode = 400;
        res.json("invalid properties");
    } else {
        next();
    }
}



module.exports.validatePostOrder = validatePostOrder;
module.exports.validateStatusOrderProps = validateStatusOrderProps;
module.exports.validateUpdateOrder = validateUpdateOrder;