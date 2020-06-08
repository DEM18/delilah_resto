//function that validates properties sent by request
function validatePaymentProps(  req, res, next ) {
    const { description } = req.body;

    if( !description ) {
        res.statusCode = 400;
        res.json("invalid properties");
    } else {
        next();
    }
}

module.exports.validatePaymentProps = validatePaymentProps