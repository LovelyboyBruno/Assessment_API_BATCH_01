const Assessment = require("../models/Assessment");

//Create Assessment
const createAssessment = async (req,res) => {
    try {
        const { title, description } = req.body;
        const assessment = await Assessment.create({
            title,
            description,
            createdBy: req.user.id,
        });

        res.status(201).json(assessment);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//Get All Assessments
const getAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find()
        .populate("createdBy", "name email");

        res.json(assessments);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//Update Assessment
const updateAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!assessment) {
            return res.status(404).json({
                message: "Assessment not found"
            });
        }

        res.json(assessment);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Delete Assessment
const deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(
            req.params.id
        );

        if (!assessment) {
            return res.status(404).json({
                message: "Assessment not found"
            });
        }

        await assessment.deleteOne();

        res.json({
            message: "Assessment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createAssessment,
    getAssessments,
    updateAssessment,
    deleteAssessment,
};