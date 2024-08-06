const formidable = require("formidable");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data", err);
        return res.status(500).json({ error: "Error parsing form data" });
      }

      let file = files.file;
      if (Array.isArray(file)) {
        file = file[0]; // If file is an array, get the first element
      }

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const formData = new FormData();
      formData.append(
        "file",
        fs.createReadStream(file.filepath),
        file.originalFilename
      );
      formData.append("metadata", JSON.stringify({ note: fields.metadata }));

      try {
        const response = await axios.post(
          "http://localhost:3000/api/upload",
          formData,
          {
            headers: {
              Authorization: fields.token,
            },
          }
        );
        res.status(200).json(response.data);
      } catch (error) {
        console.error("Error uploading file to backend", error);
        res
          .status(error.response?.status || 500)
          .json(error.response?.data || "Internal Server Error");
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
