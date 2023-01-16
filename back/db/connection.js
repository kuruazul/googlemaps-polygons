const { Sequelize } = require("sequelize")
require('dotenv').config()

class DB {
    connection 
    constructor(){
        this.connection = new Sequelize({
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            dialect: "postgres",
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        })
    }

    async start(){
        try {
            await this.connection.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
}

module.exports = new DB()