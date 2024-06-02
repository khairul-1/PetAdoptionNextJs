"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { decode } from "jwt-js-decode";
import Modal from "./Modal";

const AddPet: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
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
  //let imageFile: any;

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
      } finally {
        setLoading(false);
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
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      console.log("Selected file:", imageFile);
      setImageFile(imageFile);
      console.log(imageFile);
    }
  };

  //const imgKey = process.env.IMGBB_KEY;

  useEffect(() => {
    console.log("imageFile state updated:", imageFile);
  }, [imageFile]);

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
              // key: imgKey,
            },
          }
        );

        if (response.data.success) {
          return response.data.data.url;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setModalMessage("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    //setPetData({...petData, photoUrl: imageFile} )
    const isFormValid =
      Object.values(petData).every((value) => value !== "") && imageFile;

    // if (!isFormValid) {
    //   setModalMessage("All input fields are required.");
    //   return;
    // }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const imageUrl = await uploadImage();
        console.log(imageUrl);
        if (imageUrl) {
          const response = await axios.post(
            "https://l2assgn8.vercel.app/api/pets",
            { ...petData, photoUrl: imageUrl },
            {
              headers: { Authorization: `${token}` },
            }
          );
          setModalMessage(response.data.message);
        } else {
          setModalMessage("Failed to get image URL.");
        }
      } catch (error) {
        console.error("Error adding pet:", error);
        setModalMessage("Failed to add pet.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  return (
    <div className="mx-auto mt-10">
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
      {isAdmin ? (
        <>
          <h1 className="text-4xl text-center mb-6">Add New Pet</h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 max-w-lg mx-auto"
          >
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
        </>
      ) : (
        <p className="text-center text-red-500">{modalMessage}</p>
      )}
    </div>
  );
};

export default AddPet;
