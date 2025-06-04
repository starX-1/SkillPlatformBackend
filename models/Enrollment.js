import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const Enrollment = db.define('Enrollment', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enrolled_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'enrollments',
    timestamps: false,
});

export default Enrollment;
