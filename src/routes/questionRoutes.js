const express = require("express");
const router = express.Router();

const {
    createQuestion,
    getQuestions,
} = require("../controllers/questionController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

//Admin only
router.post(
    "/",
    protect,
    authorize("admin"),
    createQuestion
);

//Any authenticated user
router.get(
    "/:assessmentId",
    protect,
    getQuestions
);

module.exports = router;