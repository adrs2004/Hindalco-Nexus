import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';

export default function TeamIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const teamInfo = JSON.parse(localStorage.getItem('teamInfo'));
      const { data } = await axios.get('https://hindalcobackend.onrender.com/api/issues/team', {
        headers: {
          Authorization: `Bearer ${teamInfo.token}`,
        },
      });
      setIssues(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch issues');
      setLoading(false);
    }
  };

  const updateStatus = async (issueId, status) => {
    try {
      const teamInfo = JSON.parse(localStorage.getItem('teamInfo'));
      await axios.put(
        `https://hindalcobackend.onrender.com/api/issues/${issueId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${teamInfo.token}`,
          },
        }
      );
      toast.success('✅ Status updated successfully');
      fetchIssues();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

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
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'high': return 'bg-lime-100 text-lime-800 border-lime-300';
      default: return 'bg-white';
    }
  };

  const filteredIssues = selectedStatus
    ? issues.filter((issue) => issue.status === selectedStatus)
    : issues;

  if (loading) {
    return (
      <div className="h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center py-16 text-lg font-semibold text-gray-700">
          <ArrowPathIcon className="h-6 w-6 mx-auto animate-spin text-green-500 mb-3" />
          Loading your assigned issues...
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Geometric header */}
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute -left-8 -top-4 w-16 h-16 bg-green-500 rounded-full mix-blend-multiply opacity-20"></div>
          <div className="absolute -right-8 -bottom-4 w-16 h-16 bg-emerald-500 rounded-full mix-blend-multiply opacity-20"></div>
          <div className="absolute right-0 top-0 w-16 h-16 bg-lime-500 rotate-45 opacity-20"></div>
          <div className="relative text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              <span className="text-green-600">Assigned</span> Issues
            </h1>
            <p className="text-gray-600">Manage and update issue status</p>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Status bar */}
          <div className="h-1.5 flex">
            <div className="w-1/3 bg-green-500"></div>
            <div className="w-1/3 bg-emerald-500"></div>
            <div className="w-1/3 bg-lime-500"></div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Filter */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="font-medium text-gray-700">Filter by Status:</label>
              <select
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Issues</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
                <option value="re-opened">Re-opened</option>
              </select>
            </div>

            {filteredIssues.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No issues found</h3>
                <p className="text-gray-500 mb-6">
                  {selectedStatus ? `No ${selectedStatus} issues assigned to you` : "You don't have any assigned issues"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredIssues.map((issue) => {
                      const { color, icon, label } = getStatusStyle(issue.status);
                      return (
                        <tr key={issue._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">{issue.description}</div>
                            {issue.photos?.length > 0 && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {issue.photos.slice(0, 2).map((photo, index) => (
                                  <a
                                    key={index}
                                    href={`https://hindalcobackend.onrender.com/${photo}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-6 h-6 rounded border overflow-hidden"
                                  >
                                    <img
                                      src={`https://hindalcobackend.onrender.com/${photo}`}
                                      alt={`Attachment ${index + 1}`}
                                      className="object-cover w-full h-full"
                                    />
                                  </a>
                                ))}
                                {issue.photos.length > 2 && (
                                  <span className="text-xs text-gray-400">+{issue.photos.length - 2} more</span>
                                )}
                              </div>
                            )}
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                              value={issue.status}
                              onChange={(e) => updateStatus(issue._id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="resolved">Resolved</option>
                              <option value="rejected">Rejected</option>
                              <option value="re-opened">Re-opened</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center text-sm text-gray-500">
          <p>Team <span className="text-green-500 font-medium">Dashboard</span></p>
        </div>
      </div>
    </div>
  );
}