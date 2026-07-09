const Assessment = require("../models/Assessment");

//Create Assessment
const createAssessment = async (req,res, next) => {
    try {
        const { title, description } = req.body;
        const assessment = await Assessment.create({
            title,
            description,
            createdBy: req.user.id,
        });

        res.status(201).json(assessment);
    } catch (error) {
        next(error);
    }
};

//Get All Assessments
const getAssessments = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page -1) * limit;

        const filter = {
            title: {
                $regex: search,
                $options: "i",
            },
        };

        const assessments = await Assessment.find(filter)
        .populate("createdBy", "name email")
        .skip(skip)
        .limit(limit);

        const total = await Assessment.countDocuments(filter);

        res.json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalAssessments: total,
            assessments,
        });

    } catch (error) {
      next(error);
    }
};

//Update Assessment
const updateAssessment = async (req, res, next) => {
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
        next(error);
    }
};

//Delete Assessment
const deleteAssessment = async (req, res, next) => {
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
       next(error);
    }
};

module.exports = {
    createAssessment,
    getAssessments,
    updateAssessment,
    deleteAssessment,
};