import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { auth, provider } from '../services/firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, getAuth  } from 'firebase/auth';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Email/Password Signup
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signed up successfully with email & password');
      navigate('/dashboard'); // Redirect to dashboard after signup
    } catch (error: any) {
      console.error('Error during email signup:', error);
      setError('Unable to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Signed up with Google:', result.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during Google signup:', error);
      setError('Failed to sign up with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-gray-800 text-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

      {/* Email/Password Signup Form */}
      <form onSubmit={handleEmailSignup} className="space-y-4">
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
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      {/* Google Signup Button */}
      <button
        onClick={handleGoogleSignup}
        disabled={loading}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
      >
        {loading ? 'Signing up...' : 'Sign Up with Google'}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default SignUp;
