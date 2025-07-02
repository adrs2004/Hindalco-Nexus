import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        const { data } = await axios.get('https://hindalcobackend.onrender.com/api/reports', {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`
          }
        });
        setReports(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch reports');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h bg-gray-50 flex justify-center items-center p-4">
      <div className="max-w-6xl w-full relative">
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
                Team <span className="text-purple-600">Activity Reports</span>
              </h1>
              <p className="text-gray-600">Track all team member actions and changes</p>
            </div>
          </div>

          {/* Reports container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Status bar */}
            <div className="h-1.5 flex">
              <div className="w-1/3 bg-purple-500"></div>
              <div className="w-1/3 bg-indigo-500"></div>
              <div className="w-1/3 bg-violet-500"></div>
            </div>

            <div className="p-8">
              {reports.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No reports yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto">When your team members take actions on issues, their activities will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.map((report) => (
                        <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
                                {report.teamMember?.name?.charAt(0) || '?'}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {report.teamMember?.name || 'Unknown'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {report.teamMember?.email || ''}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${report.action === 'Created' ? 'bg-green-100 text-green-800' :
                                report.action === 'Updated' ? 'bg-blue-100 text-blue-800' :
                                  'bg-purple-100 text-purple-800'}`}>
                              {report.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                            {report.issueId?.title || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{report.description}</div>
                            {report.oldStatus && (
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">{report.oldStatus}</span>
                                <span className="mx-1 text-purple-500">→</span>
                                <span className="font-medium">{report.newStatus}</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {new Date(report.timestamp).toLocaleString()}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Stats summary at bottom */}
        </div>
      </div>
    </div>
  );
}