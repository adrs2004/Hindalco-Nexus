import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateIssuePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Infrastructure/Facilities');
  const [priority, setPriority] = useState('medium');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        title,
        description,
        category,
        priority
      };

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.post('https://hindalcobackend.onrender.com/api/issues', data, config);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/issue-status');
      }, 2000);
    } catch (error) {
      console.error('Error creating issue:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (level) => {
    switch(level) {
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-white';
    }
  };

  return (
    <div className="min-h bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Geometric header */}
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute -left-8 -top-4 w-16 h-16 bg-red-500 rounded-full mix-blend-multiply opacity-20"></div>
          <div className="absolute -right-8 -bottom-4 w-16 h-16 bg-yellow-500 rounded-full mix-blend-multiply opacity-20"></div>
          <div className="absolute right-0 top-0 w-16 h-16 bg-orange-500 rotate-45 opacity-20"></div>
          <div className="relative text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              <span>Report</span> an Issue
            </h1>
            <p className="text-gray-600">Let us know what needs attention</p>
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

          <div className="p-6 sm:p-8">
            {success && (
              <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200 flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-800 font-medium">Issue submitted successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 focus:outline-none bg-transparent transition-colors"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Brief summary of the issue"
                  />
                  <div className="absolute right-0 bottom-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 focus:outline-none bg-transparent transition-colors min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe the issue in detail..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6">
                {/* Category field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 focus:outline-none bg-transparent appearance-none pr-8"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
              <option value="Infrastructure/Facilities">🏢 Infrastructure/Facilities</option>
              <option value="IT/Technical">💻 IT/Technical</option>
              <option value="HR & Admin">🧑‍💼 HR & Admin</option>
              <option value="Security & Access">🔐 Security & Access</option>
              <option value="Supplies & Logistics">📦 Supplies & Logistics</option>
              <option value="Application/Portal Issues">🖥️ Application/Portal Issues</option>
                    </select>
                    <div className="absolute right-0 bottom-3 text-gray-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Priority field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    className={`w-full px-4 py-3 rounded-md border ${getPriorityColor(priority)} focus:outline-none focus:ring-1 focus:ring-opacity-50`}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Submit Issue
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center text-sm text-gray-500">
          <p>Our team will review your issue and respond promptly.<span className="text-red-500 font-medium"> Thank you for helping us improve!</span></p>
        </div>
      </div>
    </div>
  );
}
