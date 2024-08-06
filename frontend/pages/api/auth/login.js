import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const apiUrl = process.env.API_URL || "http://localhost:3000";
      console.log(apiUrl);
      const response = await axios.post(`${apiUrl}/api/login`, req.body);
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
