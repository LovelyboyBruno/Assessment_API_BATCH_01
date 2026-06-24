const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { register, login } = require("../controllers/authController");

router.get("/test", (req, res) => {
    res.send("Auth Route Working");
});

router.post("/register", register);
router.post("/login", login);

router.get("/profile",protect, (req, res) => {
    res.json({
        message: "Protected Route Accessed",
        user: req.user
    });
});

router.get(
    "/admin",
    protect,
    authorize("admin"),
    (req, res) => {
        res.json({
            message: "Welcome Admin"
        });
    }
);

module.exports = router;
