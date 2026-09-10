const mongoose = require('mongoose');
 const submissionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true,
    },

    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
                required: true,
            },

            answer: {
                type: String,
                required: true,
            },
        },
    ],
    score: {
        type: Number,
        default: 0,
    },

    percentage: {
        type: Number,
        default: 0,
    },

    result: {
        type: String,
        enum: ["passed", "failed"],
        default: "failed",
    },

    status: {
        type: String,
        enum: [
            "submitted",
            "pending_review",
            "scored",
        ],
        default: "submitted",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
    "Submission",
    submissionSchema
);