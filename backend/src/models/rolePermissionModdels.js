
module.exports = (Sequelize, sequelize) => {
    return rolePermission = sequelize.define('rolepermission', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        roleId: {
            type: Sequelize.INTEGER,
        },

        permissionId: {
            type: Sequelize.INTEGER,
        }
    });
}