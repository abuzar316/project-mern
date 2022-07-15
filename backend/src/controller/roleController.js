const db = require('../models/index');
const customErrorHandler = require('../error/customError');
const tryCarchMiddleware = require('../utils/tryCarchMiddleware');
const helper = require('../helper/helper');


module.exports.createRole = tryCarchMiddleware(async (req, res, next) => {
    const { roleName, permission } = req.body;

});

module.exports.getRoles = tryCarchMiddleware(async (req, res, next) => {
    const roles = await db.roles.findAll();
    return res.status(200).json({ roles, status: true });
});

module.exports.allPermission = tryCarchMiddleware(async (req, res, next) => {
    const permissions = await db.permission.findAll();

    return res.status(200).json({ permissions, status: true });
});

module.exports.userPermission = tryCarchMiddleware(async (req, res, next) => {
    // const permissions = await db.permission.findAll();
    const rolePermissions = await db.rolePermission.findAll({
        include: [{ model: db.roles }, { model: db.permission }]
    });

    // rolePermissions.forEach((e) => {
    //     const d = e.get({ plain: true });
    //     console.log(d)
    // })


    return res.status(200).json({ rolePermissions, status: true });
});