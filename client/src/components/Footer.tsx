import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#001F54] dark:bg-gray-900 text-white dark:text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Ministry Info */}
        <div>
          <h3 className="text-xl font-bold mb-3">ACK Youth Ministry</h3>
          <p className="text-sm leading-relaxed">
            Empowering youth through weekly Bible study, spiritual growth, and Anglican fellowship.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
            <li><Link to="/sessions" className="hover:text-yellow-300">Sessions</Link></li>
            <li><Link to="/profile" className="hover:text-yellow-300">Profile</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300">Prayer Request</Link></li>
            <Link to="/admin" className="hover:underline">Admin Dashboard</Link>

          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p className="text-sm">Email: <a href="mailto:ackyouth@example.com" className="underline">ackyouth@example.com</a></p>
          <p className="text-sm">Phone: +254 712 345678</p>
          <p className="text-sm mt-2">Location: Nairobi, Kenya</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} ACK Youth Ministry. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
