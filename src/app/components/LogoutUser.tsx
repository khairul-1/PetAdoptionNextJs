"use client";

import { useEffect } from "react";

const LogoutUser: React.FC = () => {
  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Redirect to the home page
    window.location.href = "/";
  }, []);

  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold">Logging out...</h1>
    </div>
  );
};

export default LogoutUser;
