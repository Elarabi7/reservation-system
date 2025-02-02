'use client'
import { useState } from 'react';

const CreateReservation = ({ onReservationCreated, onClose }) => {
    const [hotel, setHotel] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [roomType, setRoomType] = useState('');
    const [guests, setGuests] = useState(1);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Get username from localStorage
      const username = localStorage.getItem('username');
  
      const newReservation = {
        user: username,
        hotel,
        checkIn,
        checkOut,
        roomType,
        guests,
        status: 'Pending',
      };
  
      // Send reservation data to mock API
      const response = await fetch('https://679fb4ef24322f8329c46fea.mockapi.io/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReservation),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Notify parent component about the new reservation
        onReservationCreated(data);
        // Close the modal
        onClose();
      } else {
        alert('Failed to create reservation');
      }
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Create a Reservation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">Hotel</label>
            <select
              id="hotel"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md text-black"
            >
              <option value="">Select a Hotel</option>
              <option value="Hotel A">Hotel A</option>
              <option value="Hotel B">Hotel B</option>
              <option value="Hotel C">Hotel C</option>
              {/* Add more hotels as needed */}
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md text-black"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md text-black"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
            <select
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md text-black"
            >
              <option value="">Select Room Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
              {/* Add more room types as needed */}
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Number of Guests</label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
              min="1"
              className="w-full px-4 py-2 mt-1 border rounded-md text-black"
            />
          </div>
  
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
          >
            Create Reservation
          </button>
        </form>
      </div>
    );
  };
  
  export default CreateReservation;
  