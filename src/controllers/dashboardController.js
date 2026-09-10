const User = require("../models/User");
const Assessment = require("../models/Assessment");
const Question = require("../models/Question");
const Submission = require("../models/Submission");


const getDashboardStats = async (req, res, next) => {
    try {

        const totalUsers = await User.countDocuments();
        
        const totalStudents = await User.countDocuments({
            role: "student",
        });

        const totalAdmins = await User.countDocuments({
            role: "admin",
        });

        const totalAssessments =
        await Assessment.countDocuments();

        const totalQuestions =
        await Question.countDocuments();
        
        const totalSubmissions =
        await Submission.countDocuments();

        const submissions = await Submission.find();

        let averageScore = 0;

        if (submissions.length > 0) {
            const totalPercentage = submissions.reduce(
                (sum, submission) => sum + submission.percentage,
                0
            );
            averageScore = (
                totalPercentage / submissions.length
            ).toFixed(2);
        }

        // Highest score
        let highestScore = 0;

        if (submissions.length > 0) {
            highestPercentage = Math.max(
                ...submissions.map((submission) => submission.percentage)
            );
        }

        // Lowest score
        let lowestScore = 0;

        if (submissions.length > 0) {
            lowestPercentage = Math.min(
                ...submissions.map((s) => s.percentage)
            );
        }

        // Pass rate
        const passedStudents = submissions.filter(
            (submission) => submission.percentage >= 50
        ).length;

        const passRate =
            submissions.length > 0
                ? (
                    (passedStudents / submissions.length) * 100
                ).toFixed(2)
                : 0;


        res.json({
            totalUsers,
            totalStudents,
            totalAdmins,
            totalAssessments,
            totalQuestions,
            totalSubmissions,
            averageScore,
            highestScore,
            lowestScore,
            passRate
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats,
};