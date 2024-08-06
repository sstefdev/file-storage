import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const apiUrl = process.env.API_URL || "http://localhost:3000";
      const response = await axios.get(`${apiUrl}/api/files`, {
        headers: req.headers,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || "Internal Server Error");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
