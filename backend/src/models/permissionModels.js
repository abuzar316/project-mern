module.exports = (Sequelize, sequelize) => {
    return permission = sequelize.define('permission', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        permissionName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
}