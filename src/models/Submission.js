const mongoose = require('mongoose');
 const submissionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment"
    },

    answers: [
        {
            questionId: String,
            answer: String
        }
    ],

    status: {
        type: String,
        enum: [
            "submitted",
            "pending_review",
            "scored"
        ],
        default: "submitted"
    }
});

module.exports = mongoose.model(
    "Submission",
    submissionSchema
);