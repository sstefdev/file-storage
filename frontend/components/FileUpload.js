import { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMetadataChange = (e) => {
    setMetadata(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", metadata);
    formData.append("token", `Bearer ${localStorage.getItem("token")}`);

    try {
      const response = await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUpload(response.data.file);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          File
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Metadata
        </label>
        <input
          type="text"
          value={metadata}
          onChange={handleMetadataChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </form>
  );
};

export default FileUpload;
