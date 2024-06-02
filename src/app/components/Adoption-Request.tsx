// pages/adoption-request.tsx

"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface PetCardProps {
  petId: string;
}

const AdoptionRequest: React.FC<PetCardProps> = ({ petId }) => {
  //console.log(petId);

  const [userData, setUserData] = useState({
    contactInfo: "",
    additionalInfo: "",
    terms: false,
  });
  const [petOwnershipExperience, setPetOwnershipExperience] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user data if logged
    const token = localStorage.getItem("token");
    //console.log(token);
    if (token) {
      // Fetch user profile
      axios
        .get("https://l2assgn8.vercel.app/api/profile", {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          console.log(response.data);
          setUserData({
            ...userData,
            contactInfo: response.data.data.email,
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://l2assgn8.vercel.app/api/adoption-request`,
        {
          petId,
          petOwnershipExperience,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );
      // Show success toast
      toast.success("Adoption request submitted successfully!", {
        autoClose: 2000, // Close after 2 seconds
        onClose: () => {
          // Redirect to About page after toast is closed
          // <Link href={"/about"} />;
          window.location.href = "/myProfile"; // Navigate to the home page
        },
      });
    } catch (error: any) {
      console.error("Error submitting adoption request:", error);
      toast.error("Failed to submit adoption request");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div className="text-center">Loading...</div>;
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl text-center mb-6">Adoption Request</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contactInfo"
          >
            Contact Information
          </label>
          <input
            id="contactInfo"
            type="text"
            value={userData.contactInfo}
            onChange={(e) =>
              setUserData({ ...userData, contactInfo: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="petOwnershipExperience"
          >
            Pet Ownership Experience
          </label>
          <textarea
            id="petOwnershipExperience"
            value={petOwnershipExperience}
            onChange={(e) => setPetOwnershipExperience(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="additionalInfo"
          >
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            value={userData.additionalInfo}
            onChange={(e) =>
              setUserData({ ...userData, additionalInfo: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="terms"
          >
            <input
              id="terms"
              type="checkbox"
              checked={userData.terms}
              onChange={(e) =>
                setUserData({ ...userData, terms: e.target.checked })
              }
              className="mr-2 leading-tight"
            />
            I agree to the terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Adoption Request
        </button>
      </form>
    </div>
  );
};

export default AdoptionRequest;
