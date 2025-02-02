'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Hardcoded credentials
  const hardcodedUsers = [
    { username: 'user1', password: 'user123', role: 'User' },
    { username: 'admin', password: 'admin123', role: 'Admin' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = hardcodedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Store role in localStorage as a mock "token"
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', username);
      router.push(user.role === 'Admin' ? 'admin/dashboard' : 'user/dashboard');  // Redirect based on role
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 flex items-center justify-center font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-3 rounded-md hover:bg-indigo-800 transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
