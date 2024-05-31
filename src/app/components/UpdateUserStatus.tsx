// components/UpdateUserStatus.tsx

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
// import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { decode } from "jwt-js-decode";

// // Define the shape of your JWT payload
// interface DecodedToken {
//   type: string;
// }

const UpdateUserStatus: React.FC = () => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("user");
  const [isActive, setIsActive] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [updateType, setUpdateType] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decode(token);
        //console.log(decodedToken.payload.type);
        if (decodedToken.payload.type === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          toast.error("Only admins can perform this action.");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token.");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      toast.error("You do not have permission to perform this action.");
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      const data: any = { email };
      if (updateType) {
        data.type = type;
      }
      if (updateStatus) {
        data.isActive = isActive;
      }

      try {
        setLoading(true);
        await axios.put("http://localhost:5000/api/user-status", data, {
          headers: { Authorization: `${token}` },
        });
        toast.success("User status updated successfully!");
      } catch (error) {
        console.error("Error updating user status:", error);
        toast.error("Failed to update user status.");
      } finally {
        setLoading(false);
      }
    }
  };
  if (loading) return <div className="text-center">Loading...</div>;
  return (
    <div className="container mx-auto mt-10">
      <ToastContainer />
      <h1 className="text-4xl text-center mb-6">Update User Status</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={updateType}
              onChange={(e) => setUpdateType(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">Update User Type</span>
          </label>
          {updateType && (
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                User Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">Update Active Status</span>
          </label>
          {updateStatus && (
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="isActive"
              >
                Active Status
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsActive(true)}
                  className={`${
                    isActive ? "bg-green-500" : "bg-gray-300"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                  User Active
                </button>
                <button
                  type="button"
                  onClick={() => setIsActive(false)}
                  className={`${
                    !isActive ? "bg-red-500" : "bg-gray-300"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                  User Deactive
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default UpdateUserStatus;
