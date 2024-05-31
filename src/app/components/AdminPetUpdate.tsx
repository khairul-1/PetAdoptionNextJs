import { useEffect, useState } from "react";
import axios from "axios";

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

const AdminPetUpdate: React.FC = () => {
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

  const handleEditPet = (petId: string) => {
    // Logic to handle pet editing
    console.log(`Edit pet with ID: ${petId}`);
  };

  const handleDeletePet = async (petId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/pets/${petId}`, {
        headers: { Authorization: `${token}` },
      });
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
      setTotalPets((prevTotalPets) => prevTotalPets - 1);
      setTotalPages((prevTotalPages) => Math.ceil((totalPets - 1) / 10));
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <div className="mt-4">
          <p className="text-lg">Total Pets: {totalPets}</p>
        </div>
        <div className="mt-8">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Sl No.</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Species</th>
                <th className="py-2 px-4 border-b">Breed</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet, index) => (
                <tr key={pet.id}>
                  <td className="py-2 px-4 border-b">
                    {index + 1 + (page - 1) * 10}
                  </td>
                  <td className="py-2 px-4 border-b">{pet.name}</td>
                  <td className="py-2 px-4 border-b">{pet.species}</td>
                  <td className="py-2 px-4 border-b">{pet.breed}</td>
                  <td className="py-2 px-4 border-b">{pet.age}</td>
                  <td className="py-2 px-4 border-b">{pet.location}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="btn bg-yellow-500 text-white p-2 rounded mr-2"
                      onClick={() => handleEditPet(pet.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn bg-red-500 text-white p-2 rounded"
                      onClick={() => handleDeletePet(pet.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default AdminPetUpdate;
