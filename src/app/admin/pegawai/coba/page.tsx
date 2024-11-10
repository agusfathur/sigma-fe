"use client";

import { useState } from "react";
import { Button } from "@/components/custom/button";
import Image from "next/image";
import axiosJWT from "@/lib/authJWT";

const CobaPage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // Append file data

    try {
      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cloud/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("File uploaded successfully:", response.data);
      // Handle successful upload response (e.g., show success message)
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error response (e.g., show error message)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">foto</label>
          <br />
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
          <br />
        </div>
        {preview && (
          <div className="mt-2">
            <Image src={preview} alt="Preview" width={300} height={300} />
          </div>
        )}
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CobaPage;
