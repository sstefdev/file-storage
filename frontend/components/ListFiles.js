const ListFiles = ({ files }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id} className="mb-2">
            <a
              href={file.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {file.filename}
            </a>
            <div className="text-gray-600 text-sm">
              Metadata: {JSON.stringify(file.metadata)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFiles;
