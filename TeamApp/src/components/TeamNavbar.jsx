import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TeamNavbar() {
  const [teamInfo, setTeamInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('teamInfo'));
    setTeamInfo(info);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('teamInfo');
    setTeamInfo(null);
    navigate('/login');
  };

  return (
    <nav className="relative bg-white shadow-md p-2 border-b border-gray-200 z-50 overflow-hidden">
      {/* 🌈 Background Geometric Shapes */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute left-1/2 top-full transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-violet-200 rotate-45 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute top-0 right-1/4 w-28 h-28 bg-pink-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute bottom-1 right-5 w-16 h-16 bg-yellow-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute top-1 left-20 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>

      {/* 🔥 Main Navbar Content */}
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src="/Hindalco.png"
              alt="Brand Icon"
              className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer"
            />
          </Link>
          <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-lime-400 to-green-600 text-transparent bg-clip-text hidden sm:inline animate-pulse">
            Team Portal
          </span>
        </div>

        {teamInfo ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
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
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {location.pathname === "/login" && (
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Register
              </Link>
            )}
            {location.pathname === "/register" && (
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
