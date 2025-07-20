import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#001F54] dark:text-white">
          Sign In to Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <label className="block mb-2 font-semibold">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <label className="block mt-4 mb-2 font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full mt-6 bg-[#001F54] text-white py-2 rounded hover:bg-blue-900 transition"
        >
          Sign In
        </button>

        <div className="mt-4 text-sm text-center">
          <Link
            to="/forgot-password"
            className="text-blue-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-2 text-sm text-center">
          New here?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Create an account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
