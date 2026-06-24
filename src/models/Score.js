const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
    {
        submissionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Submission"
        },

        evaluatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        score: Number,

        feedback: String
    });

module.exports = mongoose.model(
    "Score",
    assessmentSchema
);