import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Module from './Module.js';

const Lesson = sequelize.define('Lesson', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
    },
    module_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    },
    video_url: {
        type: DataTypes.TEXT,
    },
    lesson_order: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'lessons',
    timestamps: false,
});

Lesson.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });
Module.hasMany(Lesson, { foreignKey: 'module_id', as: 'lessons' });

export default Lesson;
