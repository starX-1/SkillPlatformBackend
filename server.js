import app from './app.js';
import sequelize from './config/database.js';
import User from './models/user.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Sync models with the database
        await sequelize.sync({ force: false, alter: false }); // Set force to true only during development to drop tables
        console.log('Models synced with the database...');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();
