import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react'; // npm install lucide-react
import avatar from '../assets/avatar.png'; // Replace with user's image if dynamic

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="bg-[#001F54] dark:bg-white text-white dark:text-[#001F54] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          ACK Youth
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/sessions" className="hover:text-yellow-300 transition">Sessions</Link>

          {/* Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full border border-white dark:border-[#001F54]"
              />
              <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#001F54] text-[#001F54] dark:text-white rounded shadow-md z-10">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#002a6b]"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#002a6b]"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 px-3 py-1 rounded-full bg-white text-[#001F54] dark:bg-[#001F54] dark:text-white border border-white dark:border-[#001F54] transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#001F54] dark:bg-white text-white dark:text-[#001F54]">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Home</Link>
          <Link to="/sessions" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Sessions</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Profile</Link>
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="block mt-2 w-full text-left px-3 py-1 rounded-full bg-white text-[#001F54] dark:bg-[#001F54] dark:text-white border transition"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="block mt-2 w-full text-left px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
