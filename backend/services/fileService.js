const fs = require("fs");
const path = require("path");
const db = require("../models");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const uploadFile = async (file, metadata, userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const filePath = path.join(uploadDir, file.originalname);
  await fs.promises.writeFile(filePath, file.buffer);
  const uploadedFile = await db.File.create({
    filename: file.originalname,
    metadata,
    userId,
  });
  return uploadedFile;
};

const listFiles = (userId) => {
  return db.File.findAll({ where: { userId } });
};

const getFileById = (id) => {
  return db.File.findByPk(id);
};

module.exports = {
  uploadFile,
  listFiles,
  getFileById,
};
