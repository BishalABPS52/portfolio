import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import BlogsManagementClient from './BlogsManagementClient';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getBlogs() {
  try {
    await dbConnect();
    const blogs = await Blog.find().lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogsManagement() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const blogs = await getBlogs();
  
  return <BlogsManagementClient initialBlogs={blogs} />;
}
