import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; // to setup association later

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Sequelize generates UUID automatically
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    thumbnail_url: {
        type: DataTypes.TEXT,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'courses',
    timestamps: false, // since you have your own created_at column
});

// Define association: Course belongs to User
Course.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

export default Course;
