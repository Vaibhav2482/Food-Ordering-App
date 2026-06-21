import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ChaiChakhna Company API",
            version: "1.0.0",
            description: "Restaurant Ordering System Backend API"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },

    apis: []
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    );

};