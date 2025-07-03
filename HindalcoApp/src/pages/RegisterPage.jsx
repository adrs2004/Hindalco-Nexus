import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import registerAnimation from "../animations/signup.json";
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://hindalcobackend.onrender.com/api/users/register', {
        name,
        email,
        password,
        role: 'client'
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/create-issue');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h bg-gray-50 flex">
      {/* Left side with illustration */}
      <div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply opacity-30"></div>
        <div className="absolute right-20 bottom-0 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply opacity-30"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[-80%] w-64 h-64 bg-orange-200 rotate-45 opacity-30" ></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-12">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join Us!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Create an account to report issues, track progress, and help us improve our services.
            </p>
          <div className="p-4">
            <Lottie 
            animationData={registerAnimation}
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
            <div className="absolute -left-6 -top-4 w-12 h-12 bg-red-500 rounded-full mix-blend-multiply opacity-20"></div>
            <div className="absolute -right-6 -bottom-4 w-12 h-12 bg-yellow-500 rounded-full mix-blend-multiply opacity-20"></div>
            <div className="relative text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Client <span className="text-red-500">Registration</span>
              </h1>
              <p className="text-gray-600">Create your account to continue</p>
            </div>
          </div>

          {/* Form container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Status bar */}
            <div className="h-1.5 flex">
              <div className="w-1/3 bg-red-500"></div>
              <div className="w-1/3 bg-orange-500"></div>
              <div className="w-1/3 bg-yellow-500"></div>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-800 font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 focus:outline-none bg-transparent transition-colors"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Name"
                    />
                    <div className="absolute right-0 bottom-3 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 focus:outline-none bg-transparent transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
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
                      className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 focus:outline-none bg-transparent transition-colors"
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

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Register
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
                      Already have an account?
                    </span>
                  </div>
                </div>

                {/* Login link */}
                <div className="mt-6">
                  <Link 
                    to="/login" 
                    className="w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    Login to existing account
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By registering, you agree to our <a href="#" className="text-red-500 hover:underline">Terms of Service</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
