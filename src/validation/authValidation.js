const { body } = require("express-validator");

const registerValidation = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

        body("email")
        .isEmail()
        .withMessage("Please provide a valid email"),

        body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

        body("role")
        .isIn(["admin", "student", "evaluator"])
        .withMessage("Role must be either admin, student, or evaluator"),
];

module.exports = {
    registerValidation,
};