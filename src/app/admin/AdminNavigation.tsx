'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Availability',
    href: '/admin/availability',
    icon: CalendarIcon,
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex items-center justify-center py-6 px-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Admin Panel
        </h1>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 border-r-2 border-blue-700 dark:border-blue-200'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 w-64 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Portfolio Admin v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
