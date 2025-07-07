import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [userInfo, setUserInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(info);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative bg-white shadow-md border-b border-gray-200 overflow-hidden z-50">
      {/* 🎨 Geometric Background Shapes */}
      {/* 🎨 Geometric Background Shapes - Red Theme */}
<div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
<div className="absolute -top-4 right-10 w-28 h-28 bg-red-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
<div className="absolute bottom-0 left-1/3 w-44 h-44 bg-pink-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
<div className="absolute -bottom-10 right-1/4 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
<div className="absolute top-10 right-0 w-24 h-24 bg-orange-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>

{/* 🔴 More Circles in Red UI Theme */}
<div className="absolute top-1/4 left-1/4 w-28 h-28 bg-rose-300 rounded-full mix-blend-multiply opacity-20 z-0"></div>
<div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-red-300 rounded-full mix-blend-multiply opacity-20 z-0"></div>
<div className="absolute top-2/3 left-10 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply opacity-20 z-0"></div>
<div className="absolute bottom-0 right-0 w-28 h-28 bg-rose-400 rounded-full mix-blend-multiply opacity-20 z-0"></div>
<div className="absolute top-0 left-1/2 w-32 h-32 bg-red-400 rounded-full mix-blend-multiply opacity-20 z-0"></div>


      {/* 🔧 Existing Navbar Content */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src="/Hindalco.png" alt="Brand Icon" className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer" />
          </Link>
          <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-rose-400 to-red-600 text-transparent bg-clip-text hidden sm:inline animate-pulse">
            User Portal
          </span>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {userInfo ? (
            <>
              <Link to="/create-issue" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                Issue Desk
              </Link>
              <Link to="/issue-status" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                View Progress
              </Link>
              <Link to="/contact" className="text-gray-800 font-semibold hover:text-blue-600">Reach Us</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname === '/login' && (
                <Link
                  to="/register"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Register
                </Link>
              )}
              {location.pathname === '/register' && (
                <Link
                  to="/login"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 relative z-10">
          <div className="flex flex-col space-y-2">
            {userInfo ? (
              <>
                <Link to="/create-issue" className="text-gray-800 font-semibold hover:text-blue-600">
                  Issue Desk
                </Link>
                <Link to="/issue-status" className="text-gray-800 font-semibold hover:text-blue-600">
                  Get Support
                </Link>
                <Link to="/contact" className="text-gray-800 font-semibold hover:text-blue-600">Reach Us</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                {location.pathname === '/login' && (
                  <Link
                    to="/register"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-center"
                  >
                    Register
                  </Link>
                )}
                {location.pathname === '/register' && (
                  <Link
                    to="/login"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-center"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
