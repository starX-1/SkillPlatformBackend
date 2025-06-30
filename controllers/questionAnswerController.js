import QuestionAnswer from '../models/QuestionAnswer.js';
import { v4 as uuidv4 } from 'uuid';

export const createQuestionAnswer = async (req, res, next) => {
  try {
    const {
      quiz_response_id,
      question_id,
      answer_text,
      selected_choice_id,
    } = req.body;

    const answer = await QuestionAnswer.create({
      id: uuidv4(),
      quiz_response_id,
      question_id,
      answer_text,
      selected_choice_id,
    });

    res.status(201).json(answer);
  } catch (err) {
    next(err);
  }
};

export const getAllQuestionAnswers = async (req, res, next) => {
  try {
    const answers = await QuestionAnswer.findAll();
    res.json(answers);
  } catch (err) {
    next(err);
  }
};

export const getQuestionAnswerById = async (req, res, next) => {
  try {
    const answer = await QuestionAnswer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    res.json(answer);
  } catch (err) {
    next(err);
  }
};

export const getAnswersByQuizResponse = async (req, res, next) => {
  try {
    const answers = await QuestionAnswer.findAll({
      where: { quiz_response_id: req.params.quiz_response_id },
    });
    res.json(answers);
  } catch (err) {
    next(err);
  }
};

export const updateQuestionAnswer = async (req, res, next) => {
  try {
    const answer = await QuestionAnswer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    await answer.update(req.body);
    res.json(answer);
  } catch (err) {
    next(err);
  }
};

export const deleteQuestionAnswer = async (req, res, next) => {
  try {
    const answer = await QuestionAnswer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    await answer.destroy();
    res.json({ message: 'Answer deleted' });
  } catch (err) {
    next(err);
  }
};
