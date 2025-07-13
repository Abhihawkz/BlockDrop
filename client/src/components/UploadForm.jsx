import React, { useState } from "react";
import {
  AdvancedPasswordInput,
  FilePreview,
  ProgressBar,
  CopyToClipboardBtn,
} from "../components";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { useUser } from "@clerk/clerk-react";

const receiversEmailSchema = z.string().email();
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

const UploadForm = ({ progress }) => {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [receiverEmail, setReceiverEmail] = useState("");
  const [filePassword, setFilePassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [expiryMinutes, setExpiryMinutes] = useState("");
  const [expiryTimeDisplay, setExpiryTimeDisplay] = useState(null);

  const { user } = useUser();
  const userId = user?.id;

  const allowedExtensions = [
    "pdf", "docx", "doc", "xls", "xlsx", "csv", "txt", "rtf", "html",
    "zip", "mp3", "m4a", "wma", "mpg", "flv", "avi", "jpg", "jpeg",
    "png", "gif", "ppt", "pptx", "wav", "mp4", "m4v", "wmv", "epub",
  ];

  const onFileSelect = (file) => {
    if (file && file.size > 20000000) {
      toast.warn("File size is more than 20MB");
      setErrorMsg("Max file upload size is 20MB");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.warn("File type not allowed");
      setErrorMsg(`Allowed types: ${allowedExtensions.join(", ")}`);
      return;
    }

    setErrorMsg(null);
    setFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  async function generateKey(password, salt, keyLength = 256) {
    const algo = {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: new TextEncoder().encode(salt),
      iterations: 1000,
    };
    const baseKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return await crypto.subtle.deriveKey(
      algo,
      baseKey,
      { name: "AES-GCM", length: keyLength },
      true,
      ["encrypt", "decrypt"]
    );
  }

  const encryptFile = async (file, password) => {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await generateKey(password, salt);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedContent = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      await file.arrayBuffer()
    );
    return new Blob([salt, iv, new Uint8Array(encryptedContent)]);
  };

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const hasUpperCase = (str) => str !== str.toLowerCase();

  const upload = async (e) => {
    e.preventDefault();

    if (!receiverEmail || !receiversEmailSchema.safeParse(receiverEmail).success) {
      toast.warn("Enter a valid receiver email.");
      return;
    }

    if (!passwordSchema.safeParse(filePassword).success) {
      toast.warn("Password must be at least 8 characters.");
      return;
    }

    if (!hasUpperCase(filePassword)) {
      toast.warn("Password must include an uppercase letter.");
      return;
    }

    setUploading(true);

    try {
      const hashedPassword = await hashPassword(filePassword);
      const encryptedFile = await encryptFile(file, filePassword);

      const formData = new FormData();
      formData.append("encryptedFile", encryptedFile);
      formData.append("originalName", file.name);
      formData.append("receiverEmail", receiverEmail);
      formData.append("password", hashedPassword);

      if (expiryMinutes && parseInt(expiryMinutes) > 0) {
        formData.append("expiryMinutes", expiryMinutes);

        const futureTime = new Date(Date.now() + expiryMinutes * 60 * 1000);
        const istTime = futureTime.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        setExpiryTimeDisplay(istTime);
      } else {
        setExpiryTimeDisplay(null);
      }

      await axios.post(import.meta.env.VITE_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "user-id": userId,
        },
      });

      toast.success("File uploaded successfully!");
      setFile(null);
      setFilePassword("");
      setReceiverEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="text-center max-w-4xl mx-auto px-4">
      {user && (
        <p className="mt-4 mb-2 text-sm text-gray-600 dark:text-gray-300">
          Logged in as: <strong>{user.fullName || user.primaryEmailAddress?.emailAddress}</strong>
        </p>
      )}

      {/* Dropzone */}
      <label
        htmlFor="dropzone-file"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-4 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-500 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 ${
          isDragOver
            ? "border-blue-500 dark:border-blue-400 scale-[1.02] shadow-xl"
            : "border-blue-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400"
        }`}
      >
        <svg className="w-12 h-12 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-8m0 0l-3 3m3-3l3 3m6 4a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-semibold text-gray-700 dark:text-white">
          Click to upload or drag & drop
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Max 20MB • Formats: PDF, DOCX, MP4, ZIP, JPG...
        </p>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files[0])}
        />
      </label>

      {file && (
        <div className="mt-4 animate-fadeIn">
          <FilePreview file={file} removeFile={() => setFile(null)} />
        </div>
      )}

      {/* Receiver Email Input */}
      <div className="mt-6 text-left">
        <label className="block mb-2 font-medium text-gray-700 dark:text-white">
          Receiver's Email
        </label>
        <input
          type="email"
          placeholder="recipient@example.com"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>

      {/* Expiry Time Input */}
      <div className="mt-6 text-left">
        <label className="block mb-2 font-medium text-gray-700 dark:text-white">
          File Expiry Time (in minutes)
        </label>
        <input
          type="number"
          min="0"
          max="1440"
          value={expiryMinutes}
          onChange={(e) => setExpiryMinutes(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          placeholder="Leave blank for no auto-delete"
        />
        <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
          Optional. File will auto-delete if time is provided.
        </p>
      </div>

      {/* Show Expiry Time if set */}
      {expiryTimeDisplay && (
        <p className="mt-4 text-sm text-yellow-700 dark:text-yellow-300">
          ⏳ File will expire at: <strong>{expiryTimeDisplay}</strong> (IST)
        </p>
      )}

      {/* Password Input */}
      <div className="mt-6">
        <AdvancedPasswordInput
          seePassword={seePassword}
          setSeePassword={setSeePassword}
          filePassword={filePassword}
          setFilePassword={setFilePassword}
          idValue="file-password-encrypt"
          placeValue="Set File Password"
        />
      </div>

      {errorMsg && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-400">
          {errorMsg}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <CopyToClipboardBtn filePassword={filePassword} />
        {progress === 0 ? (
          <ProgressBar progress={progress} />
        ) : (
          <button
            onClick={upload}
            disabled={!file || uploading}
            className={`px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 ${
              uploading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 shadow-xl"
            }`}
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Send Now
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
