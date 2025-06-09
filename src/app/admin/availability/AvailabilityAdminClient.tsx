'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AvailabilityStatus {
  isAvailable: boolean;
  statusMessage: string;
  lastUpdated: string;
}

interface AvailabilityAdminClientProps {
  initialStatus: AvailabilityStatus | null;
}

export default function AvailabilityAdminClient({ initialStatus }: AvailabilityAdminClientProps) {
  const [status, setStatus] = useState<AvailabilityStatus | null>(initialStatus);
  const [isAvailable, setIsAvailable] = useState(initialStatus?.isAvailable ?? true);
  const [statusMessage, setStatusMessage] = useState(initialStatus?.statusMessage ?? '');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/availability');
      const data = await response.json();
      
      if (data.success) {
        setStatus(data.data);
        setIsAvailable(data.data.isAvailable);
        setStatusMessage(data.data.statusMessage);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const updateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/availability', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isAvailable,
          statusMessage,
          adminPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(data.data);
        setMessage('Status updated successfully!');
        setMessageType('success');
        setAdminPassword('');
      } else {
        setMessage(data.message || 'Failed to update status');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('Error updating status');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Availability Management</h1>
          <p className="text-gray-600">Manage your work availability status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Status</h2>
            
            {status ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${status.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-lg font-medium ${status.isAvailable ? 'text-green-700' : 'text-red-700'}`}>
                    {status.isAvailable ? 'Available for Work' : 'Currently Unavailable'}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 font-medium">Status Message:</p>
                  <p className="text-gray-600 mt-1">{status.statusMessage}</p>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Last Updated: {new Date(status.lastUpdated).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading status...</p>
              </div>
            )}
          </motion.div>

          {/* Update Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Status</h2>
            
            <form onSubmit={updateStatus} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability Status
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      checked={isAvailable}
                      onChange={() => setIsAvailable(true)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-green-700">Available for Work</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      checked={!isAvailable}
                      onChange={() => setIsAvailable(false)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-red-700">Currently Unavailable</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="statusMessage" className="block text-sm font-medium text-gray-700 mb-2">
                  Status Message
                </label>
                <textarea
                  id="statusMessage"
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter a brief message about your availability..."
                  required
                />
              </div>

              <div>
                <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {message && (
                <div className={`p-3 rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  'Update Status'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
