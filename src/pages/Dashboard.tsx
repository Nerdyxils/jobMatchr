import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig'; // Import firebase config
import { signOut } from 'firebase/auth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-3xl font-bold">Your Dashboard</h1>
      <p className="mt-4">Here you can see the jobs matched with your resume.</p>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
