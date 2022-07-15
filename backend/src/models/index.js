const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./usersModels')(Sequelize, sequelize);
db.roles = require('./roleMolels')(Sequelize, sequelize);
db.permission = require('./permissionModels')(Sequelize, sequelize);
db.rolePermission = require('./rolePermissionModdels')(Sequelize, sequelize, DataTypes);


db.roles.hasMany(db.users);

db.roles.hasMany(db.rolePermission);
db.permission.hasMany(db.rolePermission);


db.users.belongsTo(db.roles, {
    foreignKey: 'roleId'
});

db.rolePermission.belongsTo(db.roles, {
    foreignKey: 'roleId'
})

db.rolePermission.belongsTo(db.permission, {
    foreignKey: 'permissionId'
})

// db.roles.belongsToMany(db.permission, { through: db.rolePermission });
// db.permission.belongsToMany(db.roles, { through: db.rolePermission });


// sequelize.sync();



module.exports = db;