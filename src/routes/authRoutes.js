const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");


const {
    registerValidation,
} = require("../validation/authValidation");

const validate = require("../middleware/validationMiddleware");

const { register, login } = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post(

    "/register",
    registerValidation,
    validate,
    register
);

router.get("/test", (req, res) => {
    res.send("Auth Route Working");
});

/**
 *  @swagger
 *  /api/auth/login:
 *    post:
 *      summary: Login a user
 *      tags:
 *        - Authentication
 *      requestBody:
 *        required: true
 *      responses:
 *        200:
 *          description: Login successful
 *        400:
 *          description: Invalid credentials
 */

router.post("/login", login);

/**
 *  @swagger
 *  /api/auth/profile:
 *    get:
 *      summary: Get logged-in user's profile
 *      tags:
 *        - Authentication 
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Profile retrieved successfully
 *        401:
 *          description: Unauthorized 
 */

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
