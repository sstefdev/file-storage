import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ListFiles, FileUpload } from "@/components";

const Home = () => {
  const [files, setFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await axios.get("/api/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files", error);
      }
    };
    fetchFiles();
  }, [router]);

  const handleFileUpload = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  return (
    <div>
      <FileUpload onUpload={handleFileUpload} />
      <ListFiles files={files} />
    </div>
  );
};

export default Home;
