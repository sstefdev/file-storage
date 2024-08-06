const express = require("express");
const fileRoutes = require("./routes/fileRoutes");
const userRoutes = require("./routes/userRoutes");
const { port } = require("./config/server");
const logger = require("./utils/logger");
const db = require("./models");
const swagger = require("./swagger");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", fileRoutes);
app.use("/api", userRoutes);

// Swagger setup
swagger(app);

let server;

const startServer = async () => {
  try {
    await db.sequelize.sync();
    server = app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
  }
};

const stopServer = async () => {
  if (server) {
    server.close();
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, stopServer };
