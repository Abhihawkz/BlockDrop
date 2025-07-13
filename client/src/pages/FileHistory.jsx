import React, { useEffect, useState } from "react";
import { PageHeader } from "../components";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const FileHistory = () => {
  const { userId } = useAuth();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-files`,
          {
            headers: { "user-id": userId },
          }
        );
        setFiles(res.data.files);
      } catch (err) {
        console.error(
          "❌ Error fetching files:",
          err.response?.data || err.message
        );
      }
    };

    if (userId) fetchFiles();
  }, [userId]);

  const formatTime = (time) => new Date(time).toLocaleString();

  const getStatus = (file) => {
    const now = new Date();
    const isExpired = file.expiresAt && new Date(file.expiresAt) < now;

    if (file.deleted) return "Downloaded";
    if (isExpired) return "Expired";
    return "Available";
  };

  const CountdownTimer = ({ expiresAt }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const updateTimer = () => {
        const now = new Date();
        const expireTime = new Date(expiresAt);
        const diff = Math.max(0, expireTime - now);

        const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
        const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(
          2,
          "0"
        );
        const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(
          2,
          "0"
        );

        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }, [expiresAt]);

    return (
      <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
        Expires in: {timeLeft}
      </span>
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Expired":
        return "bg-red-100 text-red-700";
      case "Downloaded":
        return "bg-yellow-100 text-yellow-700";
      case "Available":
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const filteredFiles = files.filter((file) => {
    const status = getStatus(file);
    return filter === "All" || status === filter;
  });

  const paginatedFiles = filteredFiles.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(filteredFiles.length / pageSize);

  return (
    <div className="p-4">
      <div className="p-2">
        <PageHeader title="File History" path="Home > File History" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <select
          className="border border-gray-300 rounded px-3 py-1"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Downloaded">Downloaded</option>
          <option value="Expired">Expired</option>
        </select>

        <div>
          <button
            className="mr-2 px-2 py-1 border rounded"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="ml-2 px-2 py-1 border rounded"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">File Name</th>
              <th className="py-3 px-6 text-left">Extension</th>
              <th className="py-3 px-6 text-left">Uploaded At</th>
              <th className="py-3 px-6 text-left">Expires At</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFiles.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-600">
                  No files found.
                </td>
              </tr>
            ) : (
              paginatedFiles.map((file, index) => {
                const status = getStatus(file);
                const isExpired = file.expiresAt && new Date(file.expiresAt) < new Date();
                return (
                  <tr
                    key={file._id || index}
                    className={`border-b transition-colors duration-300 ${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-white dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <td className="py-3 px-6">{file.originalName || "—"}</td>
                    <td className="py-3 px-6">{file.extension || "—"}</td>
                    <td className="py-3 px-6">
                      {file.createdAt ? formatTime(file.createdAt) : "—"}
                    </td>
                    <td className="py-3 px-6">
                      {file.expiresAt ? (
                        isExpired ? (
                          "Expired"
                        ) : (
                          <CountdownTimer expiresAt={file.expiresAt} />
                        )
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="py-3 px-6 space-x-2">
                      <button
                        onClick={() => setSelectedFile(file)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedFile && (
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">File Details</h2>
          <p>
            <strong>File Name:</strong> {selectedFile.originalName || "—"}
          </p>
          <p>
            <strong>Extension:</strong> {selectedFile.extension || "—"}
          </p>
          <p>
            <strong>Uploaded At:</strong>{" "}
            {selectedFile.createdAt ? formatTime(selectedFile.createdAt) : "—"}
          </p>
          <p>
            <strong>Expires At:</strong>{" "}
            {selectedFile.expiresAt ? formatTime(selectedFile.expiresAt) : "—"}
          </p>
          <p>
            <strong>Status:</strong> {getStatus(selectedFile)}
          </p>
          <button
            onClick={() => setSelectedFile(null)}
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FileHistory;
