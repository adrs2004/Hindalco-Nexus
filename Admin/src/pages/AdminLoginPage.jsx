import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import adminAnimation from "../animations/Login.json";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      if (data.role !== 'admin') {
        toast.error('Only admin users can login here');
        setLoading(false);
        return;
      }

      localStorage.setItem('adminInfo', JSON.stringify(data));
      toast.success('Login successful');
      navigate('/team-management');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h bg-gray-50 flex">
      {/* Left side with illustration */}
      <div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-purple-50 to-indigo-50 overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply opacity-30"></div>
        <div className="absolute right-20 bottom-0 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply opacity-30"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[-80%] w-64 h-64 bg-violet-200 rotate-45 opacity-30"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-12">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Admin Portal
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Access the administrative dashboard to manage users, issues, and system settings.
            </p>
            <div className="p-4">
              <Lottie 
                animationData={adminAnimation}
                loop={true}
                className="w-100 h-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Geometric header */}
          <div className="relative mb-10">
            <div className="absolute -left-6 -top-4 w-12 h-12 bg-purple-500 rounded-full mix-blend-multiply opacity-20"></div>
            <div className="absolute -right-6 -bottom-4 w-12 h-12 bg-indigo-500 rounded-full mix-blend-multiply opacity-20"></div>
            <div className="relative text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin <span className="text-purple-600">Login</span>
              </h1>
              <p className="text-gray-600">Access your admin dashboard</p>
            </div>
          </div>

          {/* Form container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Status bar */}
            <div className="h-1.5 flex">
              <div className="w-1/3 bg-purple-500"></div>
              <div className="w-1/3 bg-indigo-500"></div>
              <div className="w-1/3 bg-violet-500"></div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-transparent transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@example.com"
                    />
                    <div className="absolute right-0 bottom-3 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-transparent transition-colors"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                    <div className="absolute right-0 bottom-3 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Sign In
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Restricted access
                    </span>
                  </div>
                </div>

                {/* Register link - You might want to remove this for admin login */}
                <div className="mt-6">
                  <Link 
                    to="/register" 
                    className="w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  >
                    Request admin access
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By continuing, you agree to our <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}