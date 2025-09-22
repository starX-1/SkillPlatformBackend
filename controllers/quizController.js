import Quiz from '../models/Quiz.js';
import { v4 as uuidv4 } from 'uuid';
import Enrollment from '../models/Enrollment.js';
import QuizResponse from '../models/QuizResponse.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';
import Question from '../models/Question.js';
// import Choice from '../models/Choice.js';
import { Op } from 'sequelize';
import Choice from '../models/Choice.js';

export const createQuiz = async (req, res, next) => {
    try {
        const { module_id, title, instructions, deadline, duration_minutes } = req.body;
        const quiz = await Quiz.create({
            id: uuidv4(),
            module_id,
            title,
            instructions,
            deadline,
            duration_minutes,
        });
        res.status(201).json({ id: quiz.id });
    } catch (err) {
        next(err);
    }
};

export const getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.findAll();
        res.json(quizzes);
    } catch (err) {
        next(err);
    }
};

export const getQuizById = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        next(err);
    }
};

export const updateQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        await quiz.update(req.body);
        res.json(quiz);
    } catch (err) {
        next(err);
    }
};

export const deleteQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        await quiz.destroy();
        res.json({ message: 'Quiz deleted' });
    } catch (err) {
        next(err);
    }
};
export const getUserQuizzesWithStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get enrolled course IDs for the user
        const enrollments = await Enrollment.findAll({
            where: { user_id: userId },
            raw: true,
        });

        const courseIds = enrollments.map(e => e.course_id);
        if (courseIds.length === 0) {
            return res.json([]); // No enrollments
        }

        // 2. Get all modules in enrolled courses
        const modules = await Module.findAll({
            where: { course_id: courseIds },
            raw: true,
        });

        const moduleIds = modules.map(m => m.id);
        if (moduleIds.length === 0) {
            return res.json([]); // No modules = no quizzes
        }

        // 3. Get all quizzes in those modules
        const quizzes = await Quiz.findAll({
            where: { module_id: moduleIds },
            raw: true,
        });

        const quizIds = quizzes.map(q => q.id);
        if (quizIds.length === 0) {
            return res.json([]); // No quizzes
        }

        // 4. Get quiz responses to determine status
        const responses = await QuizResponse.findAll({
            where: {
                user_id: userId,
                quiz_id: quizIds,
            },
            raw: true,
        });

        // 5. Get questions for all quizzes
        const questions = await Question.findAll({
            where: {
                quiz_id: quizIds,
            },
            raw: true,
        });

        // 6. Get all multiple-choice answers
        const questionIds = questions.map(q => q.id);
        const mcQuestions = questions.filter(q => q.type === 'multiple_choice');
        const mcQuestionIds = mcQuestions.map(q => q.id);
        console.log('MC Question IDs:', mcQuestionIds);

        const answers = await Choice.findAll({
            where: {
                question_id: {
                    [Op.in]: mcQuestionIds,
                },
            },
            raw: true,
        });
        const allAnswers = await Choice.findAll({ raw: true });
        console.log("All Answers in DB:", allAnswers);


        console.log('Fetched Answers:', answers);

        // 7. Build course and module maps for labels
        const courses = await Course.findAll({
            where: { id: courseIds },
            raw: true,
        });

        const courseMap = {};
        for (let course of courses) {
            courseMap[course.id] = course.title;
        }

        const moduleMap = {};
        for (let mod of modules) {
            moduleMap[mod.id] = mod.title;
        }

        // 8. Build full quiz structure
        const quizzesWithDetails = quizzes.map(quiz => {
            const response = responses.find(r => r.quiz_id === quiz.id);
            let status = 'not_started';

            if (response) {
                status = response.submitted_at ? 'submitted' : 'in_progress';
            }

            const quizQuestions = questions.filter(q => q.quiz_id === quiz.id).map(q => {
                const questionData = {
                    ...q,
                };

                if (q.type === 'multiple_choice') {
                    questionData.answers = answers.filter(a => a.question_id === q.id);
                }

                return questionData;
            });

            return {
                ...quiz,
                status,
                course_title: courseMap[modules.find(m => m.id === quiz.module_id)?.course_id],
                module_title: moduleMap[quiz.module_id],
                questions: quizQuestions,
            };
        });

        res.json(quizzesWithDetails);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get quizzes with status' });
    }
};


export const startQuiz = async (req, res) => {
    try {
        const userId = req.user.id;
        const quizId = req.params.id;

        // checkif already started or submitted 
        const existing = await QuizResponse.findOne({
            where: { user_id: userId, quiz_id: quizId }
        })

        if (existing) {
            if (existing.submitted_at) {
                return res.status(400).json({ message: 'Quiz Already Submitted' })
            }
            return res.status(400).json({ message: 'Quiz Already Started' })
        }

        const response = QuizResponse.create({
            user_id: userId,
            quiz_id: quizId,
            started_at: new Date(),
            submitted_at: null

        })

        res.json({
            message: 'Quiz started',
            status: 'in_progress',
            response
        })
    } catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({ message: 'Failed to start quiz' });
    }
}