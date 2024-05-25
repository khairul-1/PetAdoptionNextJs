import { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "./PetCard";

const PetsPage: React.FC = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets");
        //console.log(response.data.data);
        setPets(response.data.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will only run once, on component mount

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center mt-10">Available Pets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {pets.map((pet: any) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetsPage;
