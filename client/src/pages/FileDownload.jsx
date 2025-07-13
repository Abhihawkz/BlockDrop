import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdvancedPasswordInput, PageHeader } from "../components";
import { toast } from 'react-toastify'
import { z } from "zod";

const FileDownload = () => {
  const [password, setPassword] = useState("");
  const [fileId, setFileId] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const downloadSchema = z.object({
    fileId: z.string().min(5, "File ID field must be valid length and value"),
    password: z.string().min(8, "Password field must be valid length and value")
  });

  const handleDownload = async () => {
    const validationResult = downloadSchema.safeParse({ fileId, password });
    if (!validationResult.success) {
      validationResult.error.issues.forEach(issue => {
        toast.warn(issue.message);
      });
      return;
    }

    setIsLoading(true);

    try {
      const hashedPassword = await hashPassword(password);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/download/${fileId}`,
        {
          responseType: "blob",
          headers: {
            'Password': hashedPassword
          }
        }
      );

      let filename = "decrypted_file";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const matches =
          /filename\*?=['"]?(?:UTF-8'['"]*)?([^;'\"]+)['"]?;?/i.exec(
            contentDisposition
          );
        if (matches && matches[1]) {
          filename = decodeURIComponent(matches[1]);
        }
      }

      const decryptedFile = await decryptFile(
        new Blob([response.data]),
        password
      );
      const url = URL.createObjectURL(decryptedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setPassword("");
      setFileId("");
      toast.success("File successfully downloaded and deleted from the server");
    } catch (error) {
      console.error("Error occurred while downloading or decrypting:403 error", error);
      toast.error("File deleted from server");
    } finally {
      setIsLoading(false);
    }
  };

  const decryptFile = async (encryptedBlob, password) => {
    const buffer = await encryptedBlob.arrayBuffer();

    const salt = new Uint8Array(buffer.slice(0, 16));
    const iv = new Uint8Array(buffer.slice(16, 28));
    const encryptedData = buffer.slice(28);

    const key = await generateKey(password, salt);

    try {
      const decryptedContent = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
      );

      return new Blob([decryptedContent]);
    } catch (err) {
      console.error("Greška prilikom dešifrovanja: ", err);
      throw err;
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
    const aesKey = await crypto.subtle.deriveKey(
      algo,
      baseKey,
      { name: "AES-GCM", length: keyLength },
      true,
      ["encrypt", "decrypt"]
    );

    return aesKey;
  }

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-300 rounded-full opacity-10 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-15 animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 px-8 md:px-28 max-sm:px-2">
        {/* Enhanced PageHeader with animation */}
        <div className="animate-fade-in">
          <PageHeader title="File Download Page" path="Home > File Download" />
        </div>

        <div className="py-16">
          {/* Main Content Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-100 transform hover:scale-[1.02] transition-all duration-500 animate-slide-up">
              
              {/* Header Icon and Title */}
              <div className="text-center mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full mb-4 animate-bounce shadow-lg">
                  <span className="text-3xl">📥</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Secure File Download</h2>
                <p className="text-gray-600">Enter your credentials to download and decrypt your file</p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
              </div>

              {/* File ID Input */}
              <div className="mb-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
                <label
                  htmlFor="id-input"
                  className="flex items-center mb-3 text-lg font-semibold text-gray-800"
                >
                  <span className="mr-3 text-2xl">🆔</span>
                  Enter File ID
                </label>
                <div className="relative group">
                  <input
                    required={true}
                    type="text"
                    placeholder="Enter File ID"
                    value={fileId}
                    onChange={(e) => setFileId(e.target.value)}
                    id="id-input"
                    className="block w-full p-5 text-gray-900 border-2 border-gray-200 rounded-2xl bg-gray-50 text-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:bg-white hover:border-blue-300 placeholder-gray-500"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300 -z-10"></div>
                </div>
              </div>

              {/* Password Input - Using your AdvancedPasswordInput component */}
              <div className="mb-8 animate-slide-up" style={{animationDelay: '0.7s'}}>
                <label className="flex items-center mb-3 text-lg font-semibold text-gray-800">
                  <span className="mr-3 text-2xl">🔐</span>
                  File Password
                </label>
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300 -z-10"></div>
                  <AdvancedPasswordInput 
                    seePassword={seePassword} 
                    setSeePassword={setSeePassword} 
                    filePassword={password} 
                    setFilePassword={setPassword} 
                    idValue="file-password-decrypt" 
                    placeValue="Enter File Password" 
                  />
                </div>
              </div>

              {/* Download Button */}
              <div className="animate-slide-up" style={{animationDelay: '0.9s'}}>
                <button
                  onClick={handleDownload}
                  disabled={isLoading}
                  type="button"
                  className={`w-full px-8 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-6 focus:ring-blue-300 rounded-2xl text-center transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                    isLoading ? 'cursor-not-allowed opacity-75' : 'hover:animate-pulse'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent mr-3"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-3 text-2xl">⬇️</span>
                        DOWNLOAD AND DECRYPT
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Loading Progress Bar */}
              {isLoading && (
                <div className="mt-6 animate-fade-in">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full animate-pulse shadow-sm" style={{width: '70%'}}></div>
                  </div>
                  <p className="text-gray-600 mt-3 text-center font-medium">
                    🔓 Decrypting your file securely...
                  </p>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-8 text-center animate-fade-in" style={{animationDelay: '1.1s'}}>
                <div className="inline-flex items-center text-sm text-gray-600 bg-blue-50 px-6 py-3 rounded-full border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <span className="mr-2 text-lg">🛡️</span>
                  <span className="font-medium">End-to-end encrypted & secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FileDownload;