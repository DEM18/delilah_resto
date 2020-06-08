const express = require('express');

const roleController = require('../controllers/role');

const rolesMiddleware = require('../middlewares/roles');
const tokenMiddleware = require('../middlewares/token');
const userRoleMiddleware = require('../middlewares/userRole');

const router_role = express.Router();

router_role.post('/createrole',tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, userRoleMiddleware.validateRoleProperties, async ( req, res ) => {
    let saveRole = await roleController.insertRole( req.body );

    if( saveRole ) {
        res.statusCode = 200;  
        return res.json("role added sucessfully");
    }
     
});

router_role.get('/role', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let roles = await roleController.getRoles();

    res.statusCode = 200;
    res.json( roles );
});
router_role.delete('/role/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const roleId = req.params.id;

    let deleteRoleId = await roleController.deleteRole( roleId );

    if( deleteRoleId ) {
        res.statusCode = 200;
        res.json("rol deleted sucessfully");
    }
})
router_role.get('/role/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    const roleId = req.params.id;
    let rol = await roleController.getRolebyId( roleId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(rol);
    
});

router_role.patch('/role/:id', tokenMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, userRoleMiddleware.validateRoleProperties, async ( req, res ) => {
    const roleId = req.params.id;
    const newRole = req.body;
   
    let updateRole = await roleController.updateRole( roleId, newRole );
    //Analyze if update was made sucessfully
    if( updateRole.ok === 1 ){
        res.statusCode = 200;
        res.json("role updated sucessfully");
    }
})


module.exports = router_role;