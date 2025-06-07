'use client';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard content will go here */}
          <div className="bg-[var(--card-background)] p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Welcome</h2>
            <p className="text-[var(--muted)]">This is your admin dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}