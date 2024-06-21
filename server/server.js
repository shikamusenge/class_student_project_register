const express = require("express");
const users = require("./router/users.router");
const projects = require("./router/projects.router");
const cors = require("cors");
const app = express();
app.use(cors());
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve);
app.use(express.json());
app.get("/api-docs", swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to my api" });
});
app.use("/api/v1/users", users);
app.use("/api/v1/projects", projects);
app.listen(3002, () => console.log(`app is learning on localhost 3002`));
