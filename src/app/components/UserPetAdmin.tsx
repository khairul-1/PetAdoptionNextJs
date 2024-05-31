"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPet from "./AddPet";

const UserPetAdmin: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [view, setView] = useState("");

  useEffect(() => {
    // Fetch all user data
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/user-status",
          {
            headers: { Authorization: `${token}` },
          }
        );
        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const showModal = (modalId: string, user: any) => {
    setSelectedUser(user);
    setUserEmail(user.email);
    setUserType(user.type);
    setIsActive(user.isActive);
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const handleChangeUserType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/user-status",
        {
          email: userEmail,
          type: userType,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.data.success) {
        setModalMessage("User type updated successfully.");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === userEmail ? { ...user, type: userType } : user
          )
        );
      } else {
        setModalMessage("Failed to update user type.");
      }
    } catch (error) {
      console.error("Error updating user type:", error);
      setModalMessage("An error occurred while updating user type.");
    }
  };

  const handleChangeUserStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/user-status",
        {
          email: userEmail,
          isActive: isActive,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.data.success) {
        setModalMessage("User status updated successfully.");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === userEmail ? { ...user, isActive: isActive } : user
          )
        );
      } else {
        setModalMessage("Failed to update user status.");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      setModalMessage("An error occurred while updating user status.");
    }
  };

  return (
    <div className="flex">
      <div className="w-64 h-full shadow-md bg-white px-1 fixed">
        <ul className="relative">
          <li className="relative">
            <button
              className="btn btn-primary mt-2 underline"
              onClick={() => {
                view === "" ? setView("allUsers") : setView("");
              }}
            >
              {view === "" ? "View All Users" : "Hide All Users"}
            </button>
          </li>
          <li className="relative">
            <button
              className="btn btn-primary mt-2 underline"
              onClick={() => showModal("profile_modal", {}, "type")}
            >
              Change User Type
            </button>
          </li>
          <li className="relative">
            <button
              className="btn btn-primary mt-2 underline"
              onClick={() => showModal("status_modal", {}, "status")}
            >
              Change User Status
            </button>
          </li>
          <li className="relative">
            <button
              className="btn btn-primary mt-2 underline"
              onClick={() => showModal("add_pet_modal", {}, "add_pet")}
            >
              Add Pet
            </button>
          </li>
        </ul>
      </div>

      <div className="ml-64 p-4">
        {view === "allUsers" && (
          <>
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Type</th>
                    <th className="py-2 px-4 border-b">Active Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">{user.type}</td>
                      <td className="py-2 px-4 border-b">
                        {user.isActive ? "Active" : "Inactive"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="btn btn-primary mt-2 underline"
                          onClick={() => showModal("profile_modal", user)}
                        >
                          Change User Type
                        </button>
                        <button
                          className="btn btn-primary mt-2 underline"
                          onClick={() => showModal("status_modal", user)}
                        >
                          Change User Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <dialog id="profile_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change User Type</h3>
          <form onSubmit={handleChangeUserType}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                User Email
              </label>
              <input
                id="email"
                type="email"
                value={userEmail}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                Select user type
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update User Type
            </button>
          </form>
          {modalMessage && (
            <div className="mt-4 text-center text-green-600">
              {modalMessage}
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="status_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change User Status</h3>
          <form onSubmit={handleChangeUserStatus}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email-status"
              >
                User Email
              </label>
              <input
                id="email-status"
                type="email"
                value={userEmail}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="isActive"
              >
                Active Status
              </label>
              <select
                value={isActive === true ? "true" : "false"}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update User Status
            </button>
          </form>
          {modalMessage && (
            <div className="mt-4 text-center text-green-600">
              {modalMessage}
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="add_pet_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Pet</h3>
          <AddPet />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserPetAdmin;
