'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { 
  HomeIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  BookOpenIcon,
  PaintBrushIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  UserGroupIcon,
  TrophyIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const adminMenuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Blogs', href: '/admin/blogs', icon: DocumentTextIcon },
  { name: 'Videos', href: '/admin/videos', icon: VideoCameraIcon },
  { name: 'Poems', href: '/admin/poems', icon: BookOpenIcon },
  { name: 'Designs', href: '/admin/designs', icon: PaintBrushIcon },
  { name: 'Quotes', href: '/admin/quotes', icon: ChatBubbleLeftRightIcon },
  { name: 'Essays', href: '/admin/essays', icon: PencilSquareIcon },
  { name: 'Game Users', href: '/admin/game-users', icon: UserGroupIcon },
  { name: 'Highscores', href: '/admin/highscores', icon: TrophyIcon },
  { name: 'Availability', href: '/admin/availability', icon: CalendarIcon },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/login');
        router.refresh();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-purple-600 to-blue-600">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {adminMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 mb-1"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center px-4 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {title || 'Admin Dashboard'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
            <div className="flex items-center gap-x-2">
              <div className="text-sm font-medium text-gray-700">
                Admin User
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
