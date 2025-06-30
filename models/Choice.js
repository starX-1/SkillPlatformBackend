import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Question from './Question.js';

const Choice = sequelize.define('Choice', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
    },
    question_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'choices',
    timestamps: false,
});

Choice.belongsTo(Question, { foreignKey: 'question_id' });
Question.hasMany(Choice, { foreignKey: 'question_id' });

export default Choice;
