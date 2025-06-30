import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import QuizResponse from './QuizResponse.js';
import Question from './Question.js';
import Choice from './Choice.js';

const QuestionAnswer = sequelize.define('QuestionAnswer', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
    },
    quiz_response_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    question_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    answer_text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    selected_choice_id: {
        type: DataTypes.CHAR(36),
        allowNull: true,
    },
}, {
    tableName: 'question_answers',
    timestamps: false,
});

QuestionAnswer.belongsTo(QuizResponse, { foreignKey: 'quiz_response_id' });
QuestionAnswer.belongsTo(Question, { foreignKey: 'question_id' });
QuestionAnswer.belongsTo(Choice, { foreignKey: 'selected_choice_id' });

export default QuestionAnswer;
