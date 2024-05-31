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
  const [updatedData, setUpdatedData] = useState<Pet | null>(null); // State for holding updated pet data
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
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

  const handleEditPet = async (petId: string) => {
    // Logic to fetch pet data for editing
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/pets/${petId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setUpdatedData(response.data.data);
      console.log("Fetched pet data for editing:", response.data.data);
    } catch (error) {
      console.error("Error fetching pet for editing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async (petId: string) => {
    // Logic to save edited pet data
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/pets/${petId}`, updatedData, {
        headers: { Authorization: `${token}` },
      });
      console.log("Pet data updated successfully!");
      setSuccessMessage("Pet data updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      setUpdatedData(null); // Close modal after saving
      // Refresh the pet list
      fetchPets(search);
    } catch (error) {
      console.error("Error updating pet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = async (petId: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setUpdatedData(null);
  };
  if (loading) return <div className="text-center">Loading...</div>;
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <div className="mt-4">
          <p className="text-lg">Total Pets: {totalPets}</p>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
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
      {/* Modal for editing pet */}
      {updatedData && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Pet</h2>
            <form className="grid grid-cols-2 gap-4">
              <div className="col-span-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={updatedData.name}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="species"
                >
                  Species
                </label>
                <input
                  id="species"
                  type="text"
                  value={updatedData.species}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, species: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="breed"
                >
                  Breed
                </label>
                <input
                  id="breed"
                  type="text"
                  value={updatedData.breed}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, breed: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={updatedData.age}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      age: parseInt(e.target.value),
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={updatedData.location}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, location: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="col-span-1 mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={updatedData.description}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      description: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="col-span-1 mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="temperament"
                >
                  Temperament
                </label>
                <textarea
                  id="temperament"
                  value={updatedData.temperament}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      temperament: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="col-span-1 mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="medicalHistory"
                >
                  Medical History
                </label>
                <textarea
                  id="medicalHistory"
                  value={updatedData.medicalHistory}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      medicalHistory: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="col-span-1 mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="adoptionRequirements"
                >
                  Adoption Requirements
                </label>
                <textarea
                  id="adoptionRequirements"
                  value={updatedData.adoptionRequirements}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      adoptionRequirements: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="col-span-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleSaveEdit(updatedData.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPetUpdate;
