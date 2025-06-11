'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { 
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  availability: string;
}

interface AdminDashboardClientProps {
  initialStats: DashboardStats;
}

export default function AdminDashboardClient({ initialStats }: AdminDashboardClientProps) {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/availability');
      const data = await response.json();
      
      setStats({
        availability: data.status || 'Unknown'
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your availability status</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={fetchStats}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Refreshing...
                  </div>
                ) : (
                  'Refresh Status'
                )}
              </button>
              <Link
                href="/admin/availability"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Manage Availability
              </Link>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <CalendarIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Status</p>
                <p className="text-2xl font-bold text-gray-900 capitalize">{stats.availability}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/availability"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <CalendarIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Update Availability</h3>
                <p className="text-sm text-gray-600">Change your current status</p>
              </div>
            </Link>
            
            <Link
              href="/"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <ChartBarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">View Portfolio</h3>
                <p className="text-sm text-gray-600">See public portfolio</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
