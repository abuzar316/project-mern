require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DATABASE } = process.env;


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DATABASE
});


const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection successfully");
    } catch (error) {
        console.log("Database connection error: " + error);
    }
}


module.exports = { connect, sequelize };
