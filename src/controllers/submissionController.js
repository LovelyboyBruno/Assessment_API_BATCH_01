const Submission = require("../models/Submission");
const Question = require("../models/Question");
const Assessment = require("../models/Assessment");

// Submit Assessment
const submitAssessment = async (req, res, next) => {
    try {

        const { assessmentId, answers } = req.body;
        const existingSubmission = await Submission.findOne({
            studentId: req.user.id,
            assessmentId,
        });

        if (existingSubmission) {
            return res.status(400).json({
                message: "You have already submitted this assessment.",
            });
        }

        const assessment = await Assessment.findById(assessmentId);

        if (!assessment) {
            return res.status(404).json({
                message: "Assessment not found.",
            });
        }

        const questions = await Question.find({ assessmentId: assessmentId, });
        if (questions.length === 0) {
            return res.status(404).json({
                message: "No questions found for this assessment.",
            });
        }

        let score = 0;

        answers.forEach((studentAnswer) => {
            const question = questions.find(
                (q) =>
                    q._id.toString() ===
                studentAnswer.questionId
            );
            if (!question) {
                return;
            }

            if (
                question &&
                question.correctAnswer ===
                studentAnswer.answer
            ) {
                score++;
            }
        });

        const submission = await Submission.create({
            studentId: req.user.id,
            assessmentId,
            answers,
            score,
            status: "scored",
        });
        res.status(201).json({
            message: "Assessment submitted successfully",
            score,
            submission,
        });

    } catch (error) {
          next(error);
    }
};

//Get My Results
const getMyResults = async (req, res, next) => {
    try {

        const submissions = await Submission.find({
            studentId: req.user.id,
        })
        .populate("assessmentId", "title description");

        res.json(submissions);

    } catch (error) {
          next(error);
    }
};

//Get All Submissions (Admin)
const getAllSubmissions = async (req, res, next) => {
    try {

        const submissions = await Submission.find()
        .populate("studentId", "name email")
        .populate("assessmentId", "title");

        res.json(submissions);

    } catch (error) {
         next(error);
    }
};

module.exports = {
    submitAssessment,
    getMyResults,
    getAllSubmissions,
};

