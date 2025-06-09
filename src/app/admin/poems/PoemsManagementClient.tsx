'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Poem {
  _id: string;
  title: string;
  content: string;
  language: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PoemsManagementClientProps {
  initialPoems: Poem[];
}

export default function PoemsManagementClient({ initialPoems }: PoemsManagementClientProps) {
  const [poems, setPoems] = useState<Poem[]>(initialPoems);
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [publishedFilter, setPublishedFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    language: 'english' as 'english' | 'nepali' | 'mixed',
    author: 'Bishal Shrestha',
    tags: '',
    isPublished: true
  });

  const fetchPoems = async () => {
    try {
      const response = await fetch('/api/poems');
      if (response.ok) {
        const data = await response.json();
        setPoems(data);
      }
    } catch (error) {
      console.error('Error fetching poems:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const poemData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      const url = editingPoem ? `/api/poems/${editingPoem._id}` : '/api/poems';
      const method = editingPoem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(poemData),
      });

      if (response.ok) {
        fetchPoems();
        resetForm();
        alert(editingPoem ? 'Poem updated successfully!' : 'Poem created successfully!');
      } else {
        alert('Error saving poem');
      }
    } catch (error) {
      console.error('Error saving poem:', error);
      alert('Error saving poem');
    }
  };

  const handleEdit = (poem: Poem) => {
    setEditingPoem(poem);
    setFormData({
      title: poem.title,
      content: poem.content,
      language: poem.language as 'english' | 'nepali' | 'mixed',
      author: poem.author,
      tags: poem.tags.join(', '),
      isPublished: poem.isPublished
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this poem?')) {
      try {
        const response = await fetch(`/api/poems/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchPoems();
          alert('Poem deleted successfully!');
        } else {
          alert('Error deleting poem');
        }
      } catch (error) {
        console.error('Error deleting poem:', error);
        alert('Error deleting poem');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      language: 'english',
      author: 'Bishal Shrestha',
      tags: '',
      isPublished: true
    });
    setEditingPoem(null);
    setIsFormOpen(false);
  };

  const filteredPoems = poems.filter(poem => {
    const matchesSearch = poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage = languageFilter === 'all' || poem.language === languageFilter;
    const matchesPublished = publishedFilter === 'all' || 
                            (publishedFilter === 'published' && poem.isPublished) ||
                            (publishedFilter === 'unpublished' && !poem.isPublished);
    return matchesSearch && matchesLanguage && matchesPublished;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Poems Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add New Poem
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search poems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Languages</option>
          <option value="english">English</option>
          <option value="nepali">Nepali</option>
          <option value="mixed">Mixed</option>
        </select>
        <select
          value={publishedFilter}
          onChange={(e) => setPublishedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
      </div>

      {/* Poem Form Modal */}
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">
              {editingPoem ? 'Edit Poem' : 'Add New Poem'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value as 'english' | 'nepali' | 'mixed'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="english">English</option>
                    <option value="nepali">Nepali</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="love, nature, life"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Published</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {editingPoem ? 'Update' : 'Create'} Poem
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total</h3>
          <p className="text-3xl font-bold text-blue-600">{poems.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Published</h3>
          <p className="text-3xl font-bold text-green-600">
            {poems.filter(p => p.isPublished).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">English</h3>
          <p className="text-3xl font-bold text-purple-600">
            {poems.filter(p => p.language === 'english').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Nepali</h3>
          <p className="text-3xl font-bold text-orange-600">
            {poems.filter(p => p.language === 'nepali').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Mixed</h3>
          <p className="text-3xl font-bold text-red-600">
            {poems.filter(p => p.language === 'mixed').length}
          </p>
        </div>
      </div>

      {/* Poems List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPoems.map((poem) => (
          <motion.div
            key={poem._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                poem.language === 'english' ? 'bg-blue-100 text-blue-800' :
                poem.language === 'nepali' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {poem.language.charAt(0).toUpperCase() + poem.language.slice(1)}
              </span>
              
              <span className={`inline-block px-2 py-1 rounded text-xs ${
                poem.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {poem.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 line-clamp-2">
              {poem.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3 whitespace-pre-line">
              {poem.content.substring(0, 100)}...
            </p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {poem.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {poem.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{poem.tags.length - 3}
                </span>
              )}
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              By {poem.author} • {new Date(poem.createdAt).toLocaleDateString()}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {poem.content.split('\n').length} lines
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(poem)}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(poem._id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPoems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No poems found.</p>
        </div>
      )}
    </div>
  );
}
