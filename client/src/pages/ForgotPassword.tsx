import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'Reset link sent. Check your email.');
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#001F54] dark:text-white">
          Forgot Your Password?
        </h2>

        {message && (
          <p className="mb-4 text-sm text-green-500 text-center">{message}</p>
        )}
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <label className="block text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#001F54] text-white py-2 rounded hover:bg-blue-900 transition disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <p className="text-sm text-center mt-4">
          Remember your password?{' '}
          <a href="/signin" className="text-blue-400 hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </section>
  );
};

export default ForgotPassword;
