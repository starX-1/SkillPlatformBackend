import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Lesson from './Lesson.js';

const Submission = sequelize.define('Submission', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    lesson_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    submission_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    submitted_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'submissions',
    timestamps: false,
});

Submission.belongsTo(User, { foreignKey: 'user_id' });
Submission.belongsTo(Lesson, { foreignKey: 'lesson_id' });

export default Submission;
