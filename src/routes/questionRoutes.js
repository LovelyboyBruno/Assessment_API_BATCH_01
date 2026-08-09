const express = require("express");
const router = express.Router();

const {
    createQuestion,
    getQuestions,
    getAllQuestions,
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

router.get(
    "/",
    protect,
    authorize("admin"),
    getAllQuestions
);

//Any authenticated user
router.get(
    "/:assessmentId",
    protect,
    getQuestions
);

module.exports = router;