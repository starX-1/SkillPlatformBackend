import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Quiz from './Quiz.js';

const QuizResponse = sequelize.define('QuizResponse', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  quiz_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  started_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  submitted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'quiz_responses',
  timestamps: false,
});

QuizResponse.belongsTo(User, { foreignKey: 'user_id' });
QuizResponse.belongsTo(Quiz, { foreignKey: 'quiz_id' });
Quiz.hasMany(QuizResponse, { foreignKey: 'quiz_id' });

export default QuizResponse;
