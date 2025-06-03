import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
// Importing Sequelize and dotenv to manage environment variables
// and establish a connection to the MySQL database.
// Ensure you have a .env file with DB_NAME, DB_USER, DB_PASSWORD, and DB_HOST variables set.
// This code initializes a Sequelize instance to connect to a MySQL database using environment variables.


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
}
);

export default sequelize;
