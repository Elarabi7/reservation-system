'use client'
import { useState, useEffect } from 'react';
import CreateReservation from '../../../components/CreateReservation'; 
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [userReservations, setUserReservations] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const router = useRouter(); 

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

    const fetchReservations = async () => {
      const response = await fetch('https://679fb4ef24322f8329c46fea.mockapi.io/reservations');
      const data = await response.json();
      const userReservations = data.filter(
        (reservation) => reservation.user === storedUsername
      );
      setUserReservations(userReservations);
    };

    fetchReservations();
  }, []);

  const handleCancelReservation = async (id) => {
    const response = await fetch(`https://679fb4ef24322f8329c46fea.mockapi.io/reservations/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUserReservations(userReservations.filter((reservation) => reservation.id !== id));
    } else {
      alert('Failed to cancel the reservation.');
    }
  };

  const handleNewReservation = (newReservation) => {
    setUserReservations([...userReservations, newReservation]);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/'); 
  };

  const handleViewDetails = (reservation) => {
    setSelectedReservation(reservation);
  };

  const closeDetails = () => {
    setSelectedReservation(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal); 
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 flex flex-col items-center justify-start font-inter py-8 px-4">
      <div className="text-center text-white mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
          Welcome, {username}!
        </h1>
        <p className="text-lg sm:text-xl mt-4">Here are your reservations:</p>
      </div>

      <div className="w-full max-w-4xl mb-8 overflow-x-auto">
        <table className="table-auto w-full text-white bg-white rounded-lg shadow-xl">
          <thead className="bg-indigo-700">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium">Hotel Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium">Check-in</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium">Check-out</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {userReservations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">No reservations found.</td>
              </tr>
            ) : (
              userReservations.map((reservation) => (
                <tr key={reservation.id} className="border-b">
                  <td className="px-4 sm:px-6 py-4">{reservation.hotel}</td>
                  <td className="px-4 sm:px-6 py-4">{reservation.checkIn}</td>
                  <td className="px-4 sm:px-6 py-4">{reservation.checkOut}</td>
                  <td className="px-4 sm:px-6 py-4">{reservation.status}</td>
                  <td className="px-4 sm:px-6 py-4">
                    {reservation.status === 'Pending' && (
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetails(reservation)}
                      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={toggleModal}
        className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 mt-4"
      >
        Create New Reservation
      </button>
      <button
        onClick={handleLogout}
        className="mt-4 py-2 px-6 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>

      {showModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 modal-overlay"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 sm:w-1/2 lg:w-1/3">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <CreateReservation onReservationCreated={handleNewReservation} onClose={toggleModal} />
          </div>
        </div>
      )}

      {selectedReservation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-96 text-black">
            <h2 className="text-2xl font-bold text-indigo-700">Reservation Details</h2>
            <p><strong>Hotel Name:</strong> {selectedReservation.hotel}</p>
            <p><strong>Check-in:</strong> {selectedReservation.checkIn}</p>
            <p><strong>Check-out:</strong> {selectedReservation.checkOut}</p>
            <p><strong>Status:</strong> {selectedReservation.status}</p>
            <p><strong>Room Type:</strong> {selectedReservation.roomType}</p>
            <p><strong>Guests:</strong> {selectedReservation.guests}</p>
            <button
              onClick={closeDetails}
              className="mt-4 py-2 px-6 bg-indigo-700 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
