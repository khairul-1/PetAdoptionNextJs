"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { decode } from "jwt-js-decode";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token: any | undefined = localStorage.getItem("token");

    // const currentTime = Date.now() / 1000;
    // console.log(decodedToken.payload.type);
    // if (decodedToken.payload.exp < currentTime) {
    //   // Token has expired

    //   localStorage.removeItem("token");
    //   window.location.href = "/login";
    // }
    if (token) {
      setIsLoggedIn(true);
      const decodedToken: any = decode(token);
      setUserType(decodedToken?.payload?.type);
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
              <Link href="/register" className="btn">
                Register
              </Link>
            </>
          ) : (
            <>
              {userType === "admin" ? (
                <Link href="/adminDashboard" className="btn">
                  Admin Dashboard
                </Link>
              ) : (
                <Link href="/myprofile" className="btn">
                  My Profile
                </Link>
              )}
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
