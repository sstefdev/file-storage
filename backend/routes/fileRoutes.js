const express = require("express");
const multer = require("multer");
const {
  uploadFile,
  listFiles,
  downloadFile,
} = require("../controllers/fileController");
const auth = require("../middlewares/auth");

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management
 */

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               metadata:
 *                 type: string
 *                 example: '{"key": "value"}'
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: File and metadata are required
 *       500:
 *         description: Server error
 */
router.post("/upload", auth, upload.single("file"), uploadFile);

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: List all files for a user
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   filename:
 *                     type: string
 *                   metadata:
 *                     type: object
 *                   uploadDate:
 *                     type: string
 *                   userId:
 *                     type: number
 *                   downloadUrl:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/files", auth, listFiles);

/**
 * @swagger
 * /api/files/download/{id}:
 *   get:
 *     summary: Download a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The file ID
 *     responses:
 *       200:
 *         description: The file binary
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.get("/download/:id", downloadFile);

module.exports = router;
