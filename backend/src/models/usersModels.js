
module.exports = (Sequelize, sequelize) => {
    return User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
}

