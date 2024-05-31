"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "../components/PetCard"; // Ensure the path is correct

interface Pet {
  id: string;
  name: string;
  photoUrl: string;
  species: string;
  breed: string;
  age: number;
  location: string;
  description: string;
  size: string;
  temperament: string;
  medicalHistory: string;
  adoptionRequirements: string;
}

const HomePage: React.FC = () => {
  const [search, setSearch] = useState({
    species: "",
    breed: "",
    age: "",
    location: "",
    size: "",
  });

  const [pets, setPets] = useState<Pet[]>([]);
  const [page, setPage] = useState(1);
  const [totalPets, setTotalPets] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const fetchPets = async (params = {}) => {
    try {
      const response = await axios.get("http://localhost:5000/api/pets", {
        params: { ...params, page, limit: 10 },
      });
      setPets(response.data.data);
      setTotalPets(response.data.meta.total);
      setTotalPages(
        Math.ceil(response.data.meta.total / response.data.meta.limit)
      );
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchPets(search);
  };

  useEffect(() => {
    fetchPets(search); // Fetch all pets initially
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  if (loading) return <div className="text-center">Loading...</div>;
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Search for Pets</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap space-x-4 space-y-4"
          >
            <input
              type="text"
              name="species"
              placeholder="Species Cat or Dog"
              value={search.species}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            {/* <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={search.breed}
              onChange={handleChange}
              className="p-2 border rounded"
            /> */}
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={search.age}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            {/* <input
              type="text"
              name="location"
              placeholder="Location"
              value={search.location}
              onChange={handleChange}
              className="p-2 border rounded"
            /> */}
            <input
              type="text"
              name="size"
              placeholder="Small or Medium or Large"
              value={search.size}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="btn bg-blue-500 text-white p-2 rounded"
            >
              Search
            </button>
          </form>
        </div>
        <div className="mt-4">
          <p className="text-lg">Total Pets: {totalPets}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
            className={`p-2 m-1 ${
              page <= 1 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <span className="p-2 m-1">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
            className={`p-2 m-1 ${
              page >= totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
