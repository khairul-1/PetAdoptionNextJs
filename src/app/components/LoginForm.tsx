"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://l2assgn8.vercel.app/api/login",
        {
          email,
          password,
        }
      );
      const token = response?.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token); // Save token to local storage
      }
      //console.log(response.data.data.token);
      toast.success(`Login Successful ${response.data.message}`, {
        onClose: () => {
          window.location.href = "/"; // Navigate to the home page
        },
        autoClose: 2000,
      });
    } catch (AxiosError: any) {
      toast.error(`Error registering user.
      ${AxiosError.response.data.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="mx-auto text-center">
        <h1 className="bg-sky-500 ">Login with Email and Password </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
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
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <div className="mt-4 text-sm text-center text-gray-600">
          Do not have an account?{" "}
          <Link href="/register">
            <div className="underline">Register</div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
