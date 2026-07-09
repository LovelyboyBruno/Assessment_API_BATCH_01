const express = require("express");
const router = express.Router();

const {
    submitAssessment,
    getMyResults,
    getAllSubmissions,
} = require("../controllers/submissionController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Student submits assessment
router.post(
    "/",
    protect,
    authorize("student"),
    submitAssessment
);

//Student views own results
router.get(
    "/my-results",
    protect,
    authorize("student"),
    getMyResults
);

// Admin views all submissions
router.get(
    "/",
    protect,
    authorize("admin"),
    getAllSubmissions
);

module.exports = router;