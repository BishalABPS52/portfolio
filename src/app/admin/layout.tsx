import { Metadata } from 'next';
import AdminNavigation from './AdminNavigation';

export const metadata: Metadata = {
  title: 'Admin Panel - Bishal Portfolio',
  description: 'Administrative dashboard for managing portfolio content',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar Navigation */}
        <AdminNavigation />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h2>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}