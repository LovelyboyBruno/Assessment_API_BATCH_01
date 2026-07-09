const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
        openapi: "3.0.0",
        info: {
            title: "Assessment API",
            version: "1.0.0",
            description: "API documentation for the Assessment API",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
        definition: {
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http", 
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;