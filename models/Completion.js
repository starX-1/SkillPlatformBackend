import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const Completion = db.define('Completion', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lesson_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'completions',
    timestamps: false,
});

export default Completion;
