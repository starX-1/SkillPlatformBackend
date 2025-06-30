import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Quiz from './Quiz.js';

const Question = sequelize.define('Question', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
    },
    quiz_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('multiple_choice', 'text'),
        allowNull: false,
    },
}, {
    tableName: 'questions',
    timestamps: false,
});

Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });
Quiz.hasMany(Question, { foreignKey: 'quiz_id' });

export default Question;
