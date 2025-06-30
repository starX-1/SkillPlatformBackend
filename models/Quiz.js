import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Module from './Module.js';

const Quiz = sequelize.define('Quiz', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
    },
    module_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'quizzes',
    timestamps: false,
});

Quiz.belongsTo(Module, { foreignKey: 'module_id' });
Module.hasOne(Quiz, { foreignKey: 'module_id' });

export default Quiz;
