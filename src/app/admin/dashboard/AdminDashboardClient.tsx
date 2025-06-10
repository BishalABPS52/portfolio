'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { 
  DocumentTextIcon,
  VideoCameraIcon,
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  UserGroupIcon,
  TrophyIcon,
  ArrowRightIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  blogs: number;
  videos: number;
  designs: number;
  quotes: number;
  essays: number;
  gameUsers: number;
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
      const endpoints = [
        '/api/blogs',
        '/api/videos',
        '/api/designs',
        '/api/quotes',
        '/api/essays',
        '/api/game-users',
      ];

      const responses = await Promise.all(
        endpoints.map(endpoint => fetch(endpoint))
      );

      const data = await Promise.all(
        responses.map(response => response.json())
      );

      setStats({
        blogs: data[0]?.length || 0,
        videos: data[1]?.length || 0,
        designs: data[2]?.length || 0,
        quotes: data[3]?.length || 0,
        essays: data[4]?.length || 0,
        gameUsers: data[5]?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardItems = [
    {
      title: 'Blogs',
      count: stats.blogs,
      icon: DocumentTextIcon,
      href: '/admin/blogs',
      color: 'bg-blue-500',
      description: 'Manage blog posts'
    },
    {
      title: 'Videos',
      count: stats.videos,
      icon: VideoCameraIcon,
      href: '/admin/videos',
      color: 'bg-red-500',
      description: 'Manage video content'
    },
    {
      title: 'Designs',
      count: stats.designs,
      icon: SparklesIcon,
      href: '/admin/designs',
      color: 'bg-pink-500',
      description: 'Manage design portfolio'
    },
    {
      title: 'Quotes',
      count: stats.quotes,
      icon: ChatBubbleBottomCenterTextIcon,
      href: '/admin/quotes',
      color: 'bg-green-500',
      description: 'Manage inspirational quotes'
    },
    {
      title: 'Essays',
      count: stats.essays,
      icon: DocumentTextIcon,
      href: '/admin/essays',
      color: 'bg-orange-500',
      description: 'Manage essay collection'
    },
    {
      title: 'Game Users',
      count: stats.gameUsers,
      icon: UserGroupIcon,
      href: '/admin/game-users',
      color: 'bg-cyan-500',
      description: 'Manage game users'
    },
  ];

  const totalContent = Object.values(stats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Manage your portfolio content</p>
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
                  'Refresh Stats'
                )}
              </button>
              <Link
                href="/admin/availability"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Availability
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100">
                <ChartBarIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-3xl font-bold text-gray-900">{totalContent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <DocumentTextIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Text Content</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.blogs + stats.quotes + stats.essays}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <VideoCameraIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Media Content</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.videos + stats.designs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <UserGroupIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Game Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.gameUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${item.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 mb-2">{item.count}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/blogs"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Create New Blog</h3>
                <p className="text-sm text-gray-600">Write a new blog post</p>
              </div>
            </Link>
            
            <Link
              href="/admin/videos"
              className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <VideoCameraIcon className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Add New Video</h3>
                <p className="text-sm text-gray-600">Upload video content</p>
              </div>
            </Link>
            
            <Link
              href="/admin/availability"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <ChartBarIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Update Status</h3>
                <p className="text-sm text-gray-600">Manage availability</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
