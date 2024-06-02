"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

interface PetCardDetailsProps {
  petId: string;
}

const PetCardDetails: React.FC<PetCardDetailsProps> = ({ petId }) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://l2assgn8.vercel.app/api/pets`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        //console.log(petId);
        //console.log(response.data.data);
        const petData = response.data.data.find((pet: Pet) => pet.id === petId);
        //console.log(petData);
        setPet(petData);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  if (!pet) {
    return <div>Loading...</div>;
  }
  if (loading) return <div className="text-center">Loading...</div>;
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h2 className="text-lg font-semibold mb-2">{pet.name}</h2>
      <Image
        src={pet.photoUrl}
        quality={20}
        width={400}
        height={400}
        alt={pet.name}
        className="rounded-lg mb-2 w-40 h-40"
      />

      <p className="text-sm text-gray-600 mb-2">{pet.species}</p>
      <p className="text-sm text-gray-600 mb-2">Breed: {pet.breed}</p>
      <p className="text-sm text-gray-600 mb-2">Age: {pet.age}</p>
      <p className="text-sm text-gray-600 mb-2">Size: {pet.size}</p>
      <p className="text-sm text-gray-600 mb-2">Location: {pet.location}</p>
      <p className="text-sm text-gray-600 mb-2">{pet.description}</p>
      <p className="text-sm text-gray-600 mb-2">
        Temperament: {pet.temperament}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Medical History: {pet.medicalHistory}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Adoption Requirements: {pet.adoptionRequirements}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Created At: {new Date(pet.createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Updated At: {new Date(pet.updatedAt).toLocaleDateString()}
      </p>
      {isLoggedIn ? (
        <Link href={`/adoption-requests/${pet.id}`}>
          <p className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Adopt {pet.name}
          </p>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PetCardDetails;
