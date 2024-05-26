"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">PetAdoption</h1>
        <nav className="space-x-4">
          <Link href="/" className="btn">
            Home
          </Link>
          <Link href="/about" className="btn">
            About Us
          </Link>
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="btn">
                Login
              </Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <Link href="/myprofile" className="btn">
                My Profile
              </Link>
              <Link href="/logout" className="btn">
                Logout
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
