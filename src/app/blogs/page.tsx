import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs | Bishal Shrestha',
  description: 'Read my latest blog posts and articles',
};

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Blog posts will be loaded here */}
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-3">Welcome to My Blog</h2>
            <p className="text-muted-foreground mb-4">
              This is where I share my thoughts on technology, programming, and life experiences.
            </p>
            <div className="text-sm text-muted-foreground">
              Coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}