import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function TeamManagementPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: 'Infrastructure/Facilities'
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      const { data } = await axios.get('http://localhost:5000/api/teams', {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      setTeams(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch teams');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      await axios.post('http://localhost:5000/api/teams', formData, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      toast.success('Team member created successfully');
      setFormData({
        name: '',
        email: '',
        password: '',
        category: 'Infrastructure/Facilities'
      });
      fetchTeams();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create team member');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        await axios.delete(`http://localhost:5000/api/teams/${id}`, {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
          },
        });
        toast.success('Team member deleted successfully');
        fetchTeams();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete team member');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h bg-gray-50 flex justify-center items-center p-4">
      <div className="max-w-4xl w-full relative">
        {/* Geometric shapes in the main content area */}
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply opacity-20"></div>
        <div className="absolute -right-6 bottom-0 w-40 h-40 sm:w-60 sm:h-60 sm:-right-10 md:w-72 md:h-72 md:-right-16 
        lg:w-80 lg:h-80 lg:-right-20 bg-indigo-200 rounded-full mix-blend-multiply opacity-20"></div>


        <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 w-64 h-64 bg-violet-200 rotate-45 opacity-20"></div>
        
        {/* Content container */}
        <div className="relative z-10">
          {/* Geometric header */}
          <div className="relative mb-10">
            <div className="absolute -left-6 -top-4 w-12 h-12 bg-purple-500 rounded-full mix-blend-multiply opacity-20"></div>
            <div className="absolute -right-6 -bottom-4 w-12 h-12 bg-indigo-500 rounded-full mix-blend-multiply opacity-20"></div>
            <div className="relative text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Team <span className="text-purple-600">Management</span>
              </h1>
              <p className="text-gray-600">Manage your support team members</p>
            </div>
          </div>

          {/* Form container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
            {/* Status bar */}
            <div className="h-1.5 flex">
              <div className="w-1/3 bg-purple-500"></div>
              <div className="w-1/3 bg-indigo-500"></div>
              <div className="w-1/3 bg-violet-500"></div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Add New Team Member</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-transparent transition-colors"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Team Member Name"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-transparent transition-colors"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="member@example.com"
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
                        name="password"
                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-transparent transition-colors"
                        value={formData.password}
                        onChange={handleChange}
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

                  {/* Category field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <div className="relative">
                      <select
                        name="category"
                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-transparent transition-colors appearance-none"
                        value={formData.category}
                        onChange={handleChange}
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
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-md font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Team Member
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Team list container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Status bar */}
            <div className="h-1.5 flex">
              <div className="w-1/3 bg-purple-500"></div>
              <div className="w-1/3 bg-indigo-500"></div>
              <div className="w-1/3 bg-violet-500"></div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Team Members</h3>
              
              {teams.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-gray-600">No team members found. Add your first team member above.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {teams.map(team => (
                    <div key={team._id} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-medium text-gray-900">{team.name}</h4>
                        <p className="text-sm text-gray-600">{team.email}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          {team.category}
                        </span>
                        <button
                          onClick={() => handleDelete(team._id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}