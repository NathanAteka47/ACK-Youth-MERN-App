import { useEffect, useState } from 'react';
import axios from 'axios';

interface Session {
  _id: string;
  title: string;
  videoUrl: string;
  date: string;
}

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('/api/sessions');
        const data = Array.isArray(res.data) ? res.data : []; // 🛡️ Safe fallback
        setSessions(data);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#001F54] dark:text-white">
        Recorded Bible Study Sessions
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No sessions available yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-video w-full">
                <iframe
                  src={session.videoUrl}
                  title={session.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{session.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(session.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Sessions;
