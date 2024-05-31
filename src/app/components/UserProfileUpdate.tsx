"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfileUpdate = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user profile
      axios
        .get("http://localhost:5000/api/profile", {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          setUserData({
            name: response.data.data.name,
            email: response.data.data.email,
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // Update user profile
      await axios.put(
        `http://localhost:5000/api/profile`,
        {
          name: userData.name,
          email: userData.email,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );
      // Show success modal
      setModalMessage("Profile updated successfully!");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Show error modal
      setModalMessage("Failed to update profile");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl text-center mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </form>

      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{modalMessage}</h3>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UserProfileUpdate;
