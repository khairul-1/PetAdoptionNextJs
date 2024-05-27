// components/AdoptionRequests.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import UserPetCard from "./UserPetCard";
import Link from "next/link";
import UserProfileUpdate from "./UserProfileUpdate";
import ChangePassword from "./ChangePassword";

interface AdoptionRequest {
  id: string;
  userId: string;
  petId: string;
  status: string;
  petOwnershipExperience: string;
  createdAt: string;
  updatedAt: string;
}

interface Pet {
  id: string;
  name: string;
  photoUrl: string;
  species: string;
  breed: string;
  age: number;
  size: string;
  location: string;
  description: string;
  temperament: string;
  medicalHistory: string;
  adoptionRequirements: string;
  createdAt: string;
  updatedAt: string;
}

interface PetWithStatus extends Pet {
  status: string;
}

const UserPetProfile: React.FC = () => {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>(
    []
  );
  const [petsWithStatus, setPetsWithStatus] = useState<PetWithStatus[]>([]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch adoption requests
      axios
        .get("http://localhost:5000/api/adoption-requests", {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          setAdoptionRequests(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching adoption requests:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (adoptionRequests.length > 0) {
      const token = localStorage.getItem("token");
      const petIds = adoptionRequests.map((request) => request.petId);

      // Fetch pets related to the adoption requests
      axios
        .get("http://localhost:5000/api/pets", {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          const filteredPets = response.data.data.filter((pet: Pet) =>
            petIds.includes(pet.id)
          );
          const petsWithStatus = filteredPets.map((pet: any) => ({
            ...pet,
            status:
              adoptionRequests.find((request) => request.petId === pet.id)
                ?.status || "UNKNOWN",
          }));
          setPetsWithStatus(petsWithStatus);
        })
        .catch((error) => {
          console.error("Error fetching pets:", error);
        });
    }
  }, [adoptionRequests]);

  return (
    <div className="container mx-auto mt-10">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">User Information</h2>
            <p className="text-gray-700">
              <strong>Name:</strong> {userData.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
          <div className="container mx-auto">
            <h1 className="text-4xl text-center mb-6">
              My Adoption Requests or Adopted Pet
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {petsWithStatus.map((pet) => (
                <UserPetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </div>

          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              {/* <Link href={''}> Edit My Profile</Link> */}
              <UserProfileUpdate />
            </li>
            <li>
              {/* <a>Change Password</a> */}
              <ChangePassword />
            </li>
          </ul>
        </div>
      </div>

      {/* <div>
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">User Information</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      </div>
      <div className="container mx-auto">
        <h1 className="text-4xl text-center mb-6">
          My Adoption Requests or Adopted Pet
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {petsWithStatus.map((pet) => (
            <UserPetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default UserPetProfile;
