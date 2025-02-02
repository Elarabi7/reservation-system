'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [username, setUsername] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterHotel, setFilterHotel] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUsername = localStorage.getItem('username');
    if (storedRole !== 'Admin') {
      router.push('/login');
    } else {
      setUsername(storedUsername);
      fetchReservations();
    }
  }, [router]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://679fb4ef24322f8329c46fea.mockapi.io/reservations');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleManageReservation = async (id, action) => {
    let updatedStatus = '';

    if (action === 'approve') {
      updatedStatus = 'Approved';
    } else if (action === 'cancel') {
      updatedStatus = 'Cancelled';
    }

    try {
      const response = await fetch(`https://679fb4ef24322f8329c46fea.mockapi.io/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: updatedStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to manage reservation. Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      fetchReservations();
    } catch (error) {
      console.error('Error during reservation management:', error);
      alert(`An error occurred while managing the reservation: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    router.push('/');
  };

  const filteredReservations = reservations.filter(reservation => {
    return (
      (filterStatus ? reservation.status === filterStatus : true) &&
      (filterHotel ? reservation.hotel.includes(filterHotel) : true) &&
      (filterUser ? reservation.user.includes(filterUser) : true)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 flex flex-col items-center justify-start font-inter py-8">
      <div className="text-center text-white mb-8">
        <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight drop-shadow-md">Admin Dashboard</h1>
        <p className="text-xl mt-4">Welcome, {username}!</p>
      </div>

      <div className="mb-8 w-full max-w-4xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <input
            type="text"
            placeholder="Filter by User Name"
            className="text-black px-4 py-2 rounded-md w-full sm:w-1/3"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Hotel Name"
            className="text-black px-4 py-2 rounded-md w-full sm:w-1/3"
            value={filterHotel}
            onChange={(e) => setFilterHotel(e.target.value)}
          />
          <select
            className="text-black px-4 py-2 rounded-md w-full sm:w-1/3"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-white text-xl">Loading reservations...</div>
      ) : (
        <div className="w-full max-w-4xl px-4 sm:px-8">
          <div className="hidden sm:block">
            <table className="table-auto w-full text-white bg-white rounded-lg shadow-xl">
              <thead className="bg-indigo-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Reservation ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">User Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Hotel Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Check-in</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Check-out</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6">No reservations found.</td>
                  </tr>
                ) : (
                  filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b">
                      <td className="px-6 py-4">{reservation.id}</td>
                      <td className="px-6 py-4">{reservation.user}</td>
                      <td className="px-6 py-4">{reservation.hotel}</td>
                      <td className="px-6 py-4">{reservation.checkIn}</td>
                      <td className="px-6 py-4">{reservation.checkOut}</td>
                      <td className="px-6 py-4">{reservation.status}</td>
                      <td className="px-6 py-4 flex gap-4 justify-start">
                        {reservation.status === 'Pending' && (
                          <button
                            onClick={() => handleManageReservation(reservation.id, 'approve')}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleManageReservation(reservation.id, 'cancel')}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden">
            {filteredReservations.length === 0 ? (
              <div className="text-center text-white py-6">No reservations found.</div>
            ) : (
              filteredReservations.map((reservation) => (
                <div key={reservation.id} className="bg-white rounded-lg shadow-md p-4 mb-4 text-black">
                  <div className="mb-4">
                    <div className="font-bold">Reservation ID:</div>
                    <div>{reservation.id}</div>
                  </div>
                  <div className="mb-4">
                    <div className="font-bold">User Name:</div>
                    <div>{reservation.user}</div>
                  </div>
                  <div className="mb-4">
                    <div className="font-bold">Hotel Name:</div>
                    <div>{reservation.hotel}</div>
                  </div>
                  <div className="mb-4">
                    <div className="font-bold">Check-in:</div>
                    <div>{reservation.checkIn}</div>
                  </div>
                  <div className="mb-4">
                    <div className="font-bold">Check-out:</div>
                    <div>{reservation.checkOut}</div>
                  </div>
                  <div className="mb-4">
                    <div className="font-bold">Status:</div>
                    <div>{reservation.status}</div>
                  </div>
                  <div className="flex gap-4">
                    {reservation.status === 'Pending' && (
                      <button
                        onClick={() => handleManageReservation(reservation.id, 'approve')}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleManageReservation(reservation.id, 'cancel')}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <div className="text-center mt-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
