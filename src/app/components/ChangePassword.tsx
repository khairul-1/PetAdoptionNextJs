// components/ChangePassword.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/profile`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );
      // Show success toast
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      // Show error toast
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl text-center mb-6">Change Password</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="oldPassword"
          >
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            value={passwordData.oldPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, oldPassword: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Change Password
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
