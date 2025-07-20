import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [newSession, setNewSession] = useState({ title: '', videoUrl: '' });
  const [poster, setPoster] = useState<File | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const sessionRes = await axios.get('/api/sessions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userRes = await axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSessions(sessionRes.data);
    setUsers(userRes.data);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/sessions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSessions(sessions.filter((s) => s._id !== id));
  };

  const handleUploadSession = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('/api/sessions', newSession, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewSession({ title: '', videoUrl: '' });
    fetchData();
  };

  const handlePosterUpload = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    if (!poster) return;
    formData.append('poster', poster);
    await axios.post('/api/posters', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    setPoster(null);
  };

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#001F54] dark:text-white mb-8">
          Admin Dashboard
        </h2>

        {/* Upload New Session */}
        <form onSubmit={handleUploadSession} className="mb-10 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Add New Bible Study Session</h3>
          <input
            type="text"
            value={newSession.title}
            onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
            placeholder="Session Title"
            className="w-full p-2 rounded mb-3 dark:bg-gray-700"
            required
          />
          <input
            type="url"
            value={newSession.videoUrl}
            onChange={(e) => setNewSession({ ...newSession, videoUrl: e.target.value })}
            placeholder="YouTube Video URL"
            className="w-full p-2 rounded mb-3 dark:bg-gray-700"
            required
          />
          <button type="submit" className="bg-[#001F54] text-white px-4 py-2 rounded hover:bg-blue-900 transition">
            Upload Session
          </button>
        </form>

        {/* Upload Blog Poster */}
        <div className="mb-10 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Upload Blog Poster</h3>
          <input
            type="file"
            onChange={(e) => setPoster(e.target.files?.[0] || null)}
            className="block mb-3"
          />
          <button
            onClick={handlePosterUpload}
            className="bg-[#001F54] text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            Upload Poster
          </button>
        </div>

        {/* Search Filter */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search session by title..."
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
        </div>

        {/* Session List */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Recorded Sessions</h3>
          <div className="grid gap-4">
            {filteredSessions.map((s) => (
              <div
                key={s._id}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <p className="font-bold text-lg">{s.title}</p>
                  <p className="text-sm text-gray-500">{new Date(s.date).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="mt-3 md:mt-0 text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* User List */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Registered Users</h3>
          <div className="grid gap-4">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
