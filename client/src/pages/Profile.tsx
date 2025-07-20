import { useEffect, useState } from 'react';
import defaultAvatar from '../assets/avatar.png'; // fallback image
import axios from 'axios';

const Profile = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPreview(user.avatar || defaultAvatar);
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/api/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Profile updated successfully.');
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-12">
      <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#001F54] dark:text-white">
          Update Profile
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm font-medium text-green-500">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="text-center">
            <img
              src={preview || defaultAvatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto border-4 border-[#001F54] dark:border-white object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-3 text-sm text-center mx-auto block text-[#001F54] dark:text-white"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">New Password (optional)</label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#001F54] text-white px-6 py-2 rounded-md hover:bg-blue-900 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
