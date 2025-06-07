import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Portfolio admin dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="flex flex-col h-full">
        {/* Admin Header */}
        <header className="bg-[var(--card-background)] border-b border-[var(--border)] py-4 px-6">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}