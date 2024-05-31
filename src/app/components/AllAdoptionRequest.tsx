// pages/adoption-requests.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

interface AdoptionRequest {
  id: string;
  userId: string;
  petId: string;
  status: string;
  petOwnershipExperience: string;
  createdAt: string;
  updatedAt: string;
}

const AllAdoptionRequest: React.FC = () => {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/all-adoption-requests",
          {
            headers: { Authorization: `${token}` },
          }
        );
        if (response.data.success) {
          setAdoptionRequests(response.data.data);
        }
      } catch (err) {
        setError("Failed to fetch adoption requests");
      } finally {
        setLoading(false);
      }
    };
    fetchAdoptionRequests();
  }, []);

  const handleApprove = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/adoption-requests/${id}`,
        { status: "APPROVED" },
        {
          headers: { Authorization: `${token}` },
        }
      );

      setAdoptionRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: "APPROVED" } : request
        )
      );
    } catch (err) {
      setError("Failed to approve adoption request");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Adoption Requests</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Pet ID</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Experience</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {adoptionRequests.map((request) => (
            <tr key={request.id}>
              <td className="py-2 px-4 border-b">{request.id}</td>
              <td className="py-2 px-4 border-b">{request.userId}</td>
              <td className="py-2 px-4 border-b">{request.petId}</td>
              <td className="py-2 px-4 border-b">{request.status}</td>
              <td className="py-2 px-4 border-b">
                {request.petOwnershipExperience}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(request.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(request.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {request.status === "PENDING" ? (
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Approval Pending
                  </button>
                ) : (
                  <button
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                    disabled
                  >
                    Approved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAdoptionRequest;
