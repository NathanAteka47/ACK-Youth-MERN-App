import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const scriptures = [
  '“Your word is a lamp to my feet and a light to my path.” – Psalm 119:105',
  '“Let no one despise your youth, but be an example to the believers.” – 1 Timothy 4:12',
  '“Where two or three gather in My name, there am I with them.” – Matthew 18:20',
];

const testimonials = [
  {
    name: 'Faith M.',
    message:
      'Joining ACK Youth Bible Study has strengthened my walk with Christ and given me a supportive community.',
  },
  {
    name: 'John K.',
    message:
      'The weekly sessions give me peace, clarity, and a reason to look forward to Wednesdays.',
  },
];

const Home = () => {
  const [currentVerse, setCurrentVerse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % scriptures.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative bg-[#001F54] text-white py-24 px-6 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            ACK Youth Bible Fellowship
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl mx-auto">
            Every Wednesday • Grow in the Word • Connect in Christ
          </p>
          <Link
            to="/sessions"
            className="inline-block bg-white text-[#001F54] px-8 py-3 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
          >
            View Past Sessions
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#001F54]/90 to-[#001F54]/70"></div>
        <img
          src="/assets/anglican-background.jpg"
          alt="Anglican background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </section>

      {/* Scripture Carousel */}
      <section className="bg-[#F3F4F6] dark:bg-gray-800 py-6 text-center">
        <p className="text-xl italic font-medium transition duration-500 px-4">
          {scriptures[currentVerse]}
        </p>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#001F54] dark:text-white">
          Who We Are
        </h2>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          We are a fellowship of Anglican youth who gather weekly to study God’s Word, uplift each other spiritually, and build a strong foundation in Christ. Whether you're joining us live or catching up later, you're always welcome.
        </p>
      </section>

      {/* Video Preview */}
      <section className="py-16 bg-white dark:bg-gray-900 text-center px-6">
        <h3 className="text-2xl font-semibold mb-6 text-[#001F54] dark:text-white">
          Latest Session Preview
        </h3>
        <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-xl">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="ACK Bible Study"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F3F4F6] dark:bg-gray-800 py-16">
        <h3 className="text-2xl font-semibold text-center mb-10 text-[#001F54] dark:text-white">
          What Our Youth Say
        </h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6"
            >
              <p className="text-lg italic mb-3">“{t.message}”</p>
              <p className="font-semibold text-right text-[#001F54] dark:text-white">
                – {t.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Prayer Request Banner */}
      <section className="py-14 bg-[#001F54] text-white text-center px-6">
        <h3 className="text-2xl font-bold mb-2">Need Prayer?</h3>
        <p className="mb-5 text-lg">
          Submit your prayer request and we’ll pray with you as a community.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-[#001F54] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Submit Prayer Request
        </Link>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-[#001F54] dark:text-white">
          Never Miss a Session
        </h3>
        <p className="mb-6 text-lg max-w-2xl mx-auto">
          Sign up to access session recordings, get updates, and stay engaged in our Wednesday studies.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-[#001F54] text-white px-6 py-3 rounded-md hover:bg-blue-900 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
};

export default Home;
