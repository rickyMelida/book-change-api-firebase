const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Book Change Firebase",
      version: "1.0.0",
      contact: {
        name: "Ricardo Mélida",
        email: "ricardomelida@gmail.com",
        url: "https://rickymelida.github.io",
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

module.exports = { swaggerDocs };
