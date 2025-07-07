import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';

export default function IssueStatusPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('https://hindalcobackend.onrender.com/api/issues/client', config);
        setIssues(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching issues:', error);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icon: <ExclamationCircleIcon className="h-4 w-4 text-yellow-600" />,
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <ArrowPathIcon className="h-4 w-4 animate-spin text-blue-600" />,
        };
      case 'resolved':
        return {
          label: 'Resolved',
          color: 'bg-green-100 text-green-800 border-green-300',
          icon: <CheckCircleIcon className="h-4 w-4 text-green-600" />,
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: <XCircleIcon className="h-4 w-4 text-red-600" />,
        };
      case 're-opened':
        return {
          label: 'Re-opened',
          color: 'bg-purple-100 text-purple-800 border-purple-300',
          icon: <ArrowPathIcon className="h-4 w-4 text-purple-600" />,
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: null,
        };
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

  if (loading) {
    return (
      <div className="h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center py-16 text-lg font-semibold text-gray-700">
          <ArrowPathIcon className="h-6 w-6 mx-auto animate-spin text-red-500 mb-3" />
          Loading your issues...
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Geometric header */}
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute -left-8 -top-4 w-16 h-16 bg-red-500 rounded-full mix-blend-multiply opacity-20"></div>
          <div className="absolute -right-8 -bottom-4 w-16 h-16 bg-yellow-500 rounded-full mix-blend-multiply opacity-20"></div>
          <div className="absolute right-0 top-0 w-16 h-16 bg-orange-500 rotate-45 opacity-20"></div>
          <div className="relative text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              <span>Your</span> Reported Issues
            </h1>
            <p className="text-gray-600">Track the status of your submissions</p>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Status bar */}
          <div className="h-1.5 flex">
            <div className="w-1/3 bg-red-500"></div>
            <div className="w-1/3 bg-orange-500"></div>
            <div className="w-1/3 bg-yellow-500"></div>
          </div>

          <div className="p-6 sm:p-8">
            {issues.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No issues found</h3>
                <p className="text-gray-500 mb-6">You haven't reported any issues yet</p>
                <button
                  onClick={() => navigate('/create-issue')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Report New Issue
                </button>
              </div>
            ) : (
              <div className="overflow-hidden">
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {issues.map((issue) => {
                        const { color, icon, label } = getStatusStyle(issue.status);
                        return (
                          <tr key={issue._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 max-w-xs break-words">
                            <div className="text-sm font-medium text-gray-900">
                            {issue.title}
                            </div>
                             <div className="text-xs text-gray-500 mt-1">
                              {issue.description}
                              </div>
                              </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {issue.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(issue.priority)}`}>
                                {issue.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
                                {icon}
                                <span className="ml-1">{label}</span>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(issue.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-4">
                  {issues.map((issue) => {
                    const { color, icon, label } = getStatusStyle(issue.status);
                    return (
                      <div key={issue._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="space-y-3">
                          <div className="overflow-y-auto max-h-40">
                            <h3 className="text-sm font-medium text-gray-900">{issue.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{issue.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Category</p>
                              <p className="text-sm text-gray-900 capitalize">{issue.category}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500">Priority</p>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(issue.priority)}`}>
                                {issue.priority}
                              </span>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500">Status</p>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
                                {icon}
                                <span className="ml-1">{label}</span>
                              </span>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500">Date</p>
                              <p className="text-sm text-gray-900">
                                {new Date(issue.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center text-sm text-gray-500">
          <p>Yo, buddy! <span className="text-red-500 font-medium">Check Your Status</span></p>
        </div>
      </div>
    </div>
  );
}