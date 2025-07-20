import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password });
      navigate('/signin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#001F54] dark:text-white">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        {/* Name */}
        <label className="block mb-2 font-medium">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
          required
        />

        {/* Email */}
        <label className="block mt-4 mb-2 font-medium">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
          required
        />

        {/* Password */}
        <label className="block mt-4 mb-2 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-[#001F54] text-white py-2 rounded hover:bg-blue-900 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-400 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
