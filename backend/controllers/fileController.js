const path = require("path");
const redis = require("../config/redis");
const fileService = require("../services/fileService");
const logger = require("../utils/logger");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const metadata = req.body.metadata;

    if (!file || !metadata) {
      return res
        .status(400)
        .json({ message: "File and metadata are required" });
    }

    const cacheKey = `files:${req.user.userId}`;
    await redis.del(cacheKey);

    const parsedMetadata = JSON.parse(metadata);
    const uploadedFile = await fileService.uploadFile(
      file,
      parsedMetadata,
      req.user.userId
    );

    res
      .status(201)
      .json({ message: "File uploaded successfully", file: uploadedFile });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const listFiles = async (req, res) => {
  try {
    const cacheKey = `files:${req.user.userId}`;
    const cachedFiles = await redis.get(cacheKey);

    if (cachedFiles) {
      console.log("Serving from cache");
      return res.status(200).json(JSON.parse(cachedFiles));
    }

    console.log("Serving from database");
    const files = await File.findAll({
      where: { userId: req.user.userId },
    });

    await redis.set(cacheKey, JSON.stringify(files), "EX", 3600); // Cache for 1 hour

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const fileRecord = await fileService.getFileById(fileId);

    if (!fileRecord) {
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = path.join(__dirname, "../uploads", fileRecord.filename);
    res.download(filePath, fileRecord.filename);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  uploadFile,
  listFiles,
  downloadFile,
};
