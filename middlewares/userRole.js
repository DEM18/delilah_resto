//function that validates properties sent by request
function validateRoleProperties(  req, res, next ) {
    const { description } = req.body;

    if( !description ) {
        res.statusCode = 400;
        res.json("Invalid properties");
    } else {
        next();
    }
}

module.exports.validateRoleProperties = validateRoleProperties;