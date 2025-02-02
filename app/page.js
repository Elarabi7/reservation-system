import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 flex flex-col items-center justify-center font-inter text-white">
    {/* Header Section */}
    <header className="text-center mb-12">
      <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">
        Welcome to the Reservation Management System
      </h1>
      <p className="text-xl mt-4 max-w-lg mx-auto">
        Easily manage your hotel reservations as a user or an admin. Create, view, and manage reservations efficiently. Start now!
      </p>
    </header>

    {/* Explanation Section */}
    <section className="bg-white text-black p-8 rounded-xl shadow-lg w-3/4 sm:w-1/2 lg:w-1/3">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
        How It Works
      </h2>
      <div className="text-lg mb-4">
        This system allows users to book and manage hotel reservations. Users can:
        <ul className="list-disc pl-6 mt-2">
          <li>Create a new reservation with hotel selection, check-in/check-out dates, and room type.</li>
          <li>View their reservations and cancel them if necessary.</li>
        </ul>
        Admins can:
        <ul className="list-disc pl-6 mt-2">
          <li>View and manage all reservations from users.</li>
          <li>Approve or cancel pending reservations.</li>
        </ul>
      </div>
      <div className="text-center mt-6">
        <Link href="pages/login">
          <button className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-3 px-6 rounded-md hover:bg-indigo-800 transition-all">
            Login to Get Started
          </button>
        </Link>
      </div>
    </section>
  </div>
  );
}
