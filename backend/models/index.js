const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");
const logger = require("../utils/logger");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../file_storage.db"),
  logging: (msg) => logger.info(msg),
});

const db = {};

// Dynamically import models
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
