// components/AddPet.tsx

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { decode } from "jwt-js-decode";
import Modal from "./Modal";

const AddPet: React.FC = () => {
  const [petData, setPetData] = useState({
    name: "Buddy",
    photoUrl: "",
    species: "dog",
    breed: "Labrador Retriever",
    age: 5,
    size: "Large",
    location: "Shelter TEST3",
    description:
      "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
    temperament: "Friendly, playful",
    medicalHistory: "Up to date on vaccinations, neutered.",
    adoptionRequirements:
      "Buddy needs a home with a fenced yard and an active family.",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decode(token);
        if (decodedToken.payload.type === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setModalMessage("Only admins can perform this action.");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setModalMessage("Invalid token.");
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (id === "age") {
      setPetData({ ...petData, [id]: parseInt(value) });
    } else {
      setPetData({ ...petData, [id]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            params: {
              key: "8216abb6bba6ecd271d044d375ede495",
            },
          }
        );

        if (response.data.success) {
          return response.data.data.url;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setModalMessage("Failed to upload image.");
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    const isFormValid =
      Object.values(petData).every((value) => value !== "") && imageFile;

    if (!isFormValid) {
      setModalMessage("All input fields are required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const imageUrl = await uploadImage();

        if (imageUrl) {
          const response = await axios.post(
            "http://localhost:5000/api/pets",
            { ...petData, photoUrl: imageUrl },
            {
              headers: { Authorization: `${token}` },
            }
          );
          setModalMessage(response.data.message);
          setPetData({
            name: "",
            photoUrl: "",
            species: "",
            breed: "",
            age: 1,
            size: "",
            location: "",
            description: "",
            temperament: "",
            medicalHistory: "",
            adoptionRequirements: "",
          });
          setImageFile(null);
        } else {
          setModalMessage("Failed to get image URL.");
        }
      } catch (error) {
        console.error("Error adding pet:", error);
        setModalMessage("Failed to add pet.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
      <h1 className="text-4xl text-center mb-6">Add New Pet</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {Object.keys(petData).map(
          (key) =>
            key !== "photoUrl" && (
              <div className="mb-4" key={key}>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={key}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {key === "description" ||
                key === "temperament" ||
                key === "medicalHistory" ||
                key === "adoptionRequirements" ? (
                  <textarea
                    id={key}
                    value={petData[key as keyof typeof petData]}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <input
                    id={key}
                    type={key === "age" ? "number" : "text"}
                    value={petData[key as keyof typeof petData]}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                )}
              </div>
            )
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photoUrl"
          >
            Photo
          </label>
          <input
            id="photoUrl"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Pet
        </button>
      </form>
    </div>
  );
};

export default AddPet;
