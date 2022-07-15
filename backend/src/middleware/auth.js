const tryCarchMiddleware = require('../utils/tryCarchMiddleware');
const helper = require('../helper/helper');
const customErrorHandler = require('../error/customError');
const db = require('../models/index');
const { roleName } = require('../helper/data');


module.exports.verifyToken = tryCarchMiddleware(async (req, res, next) => {

    const authorization = req.headers.authorization;
    
    // console.log(authorization)

    if (authorization === undefined || authorization === null) {
        return next(customErrorHandler("Not authorized"));
    }

    const token = authorization.replace("Bearer ", "");

    const verifyToken = helper.verifyToken(token);
    // console.log(verifyToken)

    const user = await db.users.findOne({
        where: { id: verifyToken.id }, include: [{
            model: db.roles,
        }]
    });

    let allPermissions = [];

    const rolePermissionData = await db.rolePermission.findAll({
        where: { roleId: user.roleId }, include: [{
            model: db.roles,
        }, { model: db.permission, }]
    });

    rolePermissionData.forEach((e) => {
        let rolePer = e.get({ plain: true });
        allPermissions.push(rolePer.permission.permissionName)
    })

    req.user = user;
    req.userRole = user.role.roleName;
    req.permission = allPermissions;

    next();

})


module.exports.permission = (apiPermission) => {
    return tryCarchMiddleware((req, res, next) => {
        switch (true) {
            case (req.userRole === roleName.admin):
                return next();
            case (req.permission.includes(apiPermission)):
                return next();
            default:
                return next(customErrorHandler("this user is not allowed!"));
        }
    })
}