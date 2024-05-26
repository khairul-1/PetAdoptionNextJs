// components/PetCard.tsx
import Image from "next/image";
import { useState } from "react";

interface PetWithStatus {
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
  status: string; // New status field
}

interface PetCardProps {
  pet: PetWithStatus;
}

const UserPetCard: React.FC<PetCardProps> = ({ pet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="border border-gray-200 rounded-md p-4">
        {/* <div className="max-w-sm rounded overflow-hidden shadow-lg"> */}
        {/* <img className="w-full" src={pet.photoUrl} alt={pet.name} /> */}
        <Image
          src={pet.photoUrl}
          quality={20}
          width={400}
          height={400}
          alt={pet.name}
          className="rounded-lg mb-2 w-24 h-24"
        />

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{pet.name}</div>
          <p className="text-gray-700 text-sm">{pet.description}</p>
        </div>
        <div className="px-6 pt-2 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            {pet.breed}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {pet.age} years old
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {pet.size}
          </span>
          <div>
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
              Status: {pet.status}
            </span>
            <button
              onClick={openModal}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Details
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <img
                      src={pet.photoUrl}
                      alt={pet.name}
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {pet.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Species: {pet.species}
                      </p>
                      <p className="text-sm text-gray-500">
                        Breed: {pet.breed}
                      </p>
                      <p className="text-sm text-gray-500">Age: {pet.age}</p>
                      <p className="text-sm text-gray-500">Size: {pet.size}</p>
                      <p className="text-sm text-gray-500">
                        Location: {pet.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        Description: {pet.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Temperament: {pet.temperament}
                      </p>
                      <p className="text-sm text-gray-500">
                        Medical History: {pet.medicalHistory}
                      </p>
                      <p className="text-sm text-gray-500">
                        Adoption Requirements: {pet.adoptionRequirements}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: {pet.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPetCard;
