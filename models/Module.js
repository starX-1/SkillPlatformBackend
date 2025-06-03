import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Course from './Course.js';

const Module = sequelize.define('Module', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
    },
    course_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    module_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'modules',
    timestamps: false,
});

Module.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
Course.hasMany(Module, { foreignKey: 'course_id', as: 'modules' });

export default Module;
