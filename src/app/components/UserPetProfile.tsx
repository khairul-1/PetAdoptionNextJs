// components/AdoptionRequests.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import UserPetCard from "./UserPetCard";
import Link from "next/link";

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

const AdoptionRequests: React.FC = () => {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>(
    []
  );
  const [petsWithStatus, setPetsWithStatus] = useState<PetWithStatus[]>([]);

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
          const petsWithStatus = filteredPets.map((pet) => ({
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
      <h1 className="text-4xl text-center mb-6">Your Adoption Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petsWithStatus.map((pet) => (
          <UserPetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default AdoptionRequests;
