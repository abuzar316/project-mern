
module.exports = (Sequelize, sequelize) => {
    return Role = sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true
        },
        roleName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
}
