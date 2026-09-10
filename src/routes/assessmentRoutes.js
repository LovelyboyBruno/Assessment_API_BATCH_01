const express = require("express");
const router = express.Router();

const {
    createAssessment,
    getAssessments,
    getAssessmentById,
    updateAssessment,
    deleteAssessment,
} = require("../controllers/assessmentController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

//Admin only
router.post(
"/",
protect,
authorize("admin"),
createAssessment
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateAssessment
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteAssessment
);

//Any logged-in user
router.get(
    "/",
    protect,
    getAssessments
);

router.get(
    "/:id",
    protect,
    getAssessmentById
);

module.exports = router;