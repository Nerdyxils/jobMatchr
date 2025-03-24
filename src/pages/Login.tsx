import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { auth, provider } from '../services/firebaseConfig'; // Import firebase config
import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, getAuth } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Email/Password Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully with email & password');
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error: any) {
      console.error('Error during email login:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Google Login
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Logged in with Google:', result.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during Google login:', error);
      setError('Failed to log in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-gray-800 text-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {/* Email/Password Login Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-600 rounded bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-600 rounded bg-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
      >
        {loading ? 'Logging in...' : 'Login with Google'}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
