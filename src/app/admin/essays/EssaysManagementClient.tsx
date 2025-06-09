'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Essay {
  _id: string;
  title: string;
  content: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface EssaysManagementClientProps {
  initialEssays: Essay[];
}

export default function EssaysManagementClient({ initialEssays }: EssaysManagementClientProps) {
  const [essays, setEssays] = useState<Essay[]>(initialEssays);
  const [editingEssay, setEditingEssay] = useState<Essay | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    language: 'english' as 'english' | 'nepali' | 'mixed'
  });

  const fetchEssays = async () => {
    try {
      const response = await fetch('/api/essays');
      if (response.ok) {
        const data = await response.json();
        setEssays(data);
      }
    } catch (error) {
      console.error('Error fetching essays:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingEssay ? `/api/essays/${editingEssay._id}` : '/api/essays';
      const method = editingEssay ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchEssays();
        resetForm();
        alert(editingEssay ? 'Essay updated successfully!' : 'Essay created successfully!');
      } else {
        alert('Error saving essay');
      }
    } catch (error) {
      console.error('Error saving essay:', error);
      alert('Error saving essay');
    }
  };

  const handleEdit = (essay: Essay) => {
    setEditingEssay(essay);
    setFormData({
      title: essay.title,
      content: essay.content,
      language: essay.language as 'english' | 'nepali' | 'mixed'
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this essay?')) {
      try {
        const response = await fetch(`/api/essays/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchEssays();
          alert('Essay deleted successfully!');
        } else {
          alert('Error deleting essay');
        }
      } catch (error) {
        console.error('Error deleting essay:', error);
        alert('Error deleting essay');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      language: 'english'
    });
    setEditingEssay(null);
    setIsFormOpen(false);
  };

  const filteredEssays = essays.filter(essay => {
    const matchesSearch = essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         essay.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || essay.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Essays Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add New Essay
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search essays..."
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
      </div>

      {/* Essay Form Modal */}
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
              {editingEssay ? 'Edit Essay' : 'Add New Essay'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  {editingEssay ? 'Update' : 'Create'} Essay
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Essays</h3>
          <p className="text-3xl font-bold text-blue-600">{essays.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">English</h3>
          <p className="text-3xl font-bold text-green-600">
            {essays.filter(e => e.language === 'english').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibant text-gray-900">Nepali</h3>
          <p className="text-3xl font-bold text-purple-600">
            {essays.filter(e => e.language === 'nepali').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Mixed</h3>
          <p className="text-3xl font-bold text-orange-600">
            {essays.filter(e => e.language === 'mixed').length}
          </p>
        </div>
      </div>

      {/* Essays List */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredEssays.map((essay) => (
          <motion.div
            key={essay._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                essay.language === 'english' ? 'bg-blue-100 text-blue-800' :
                essay.language === 'nepali' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {essay.language.charAt(0).toUpperCase() + essay.language.slice(1)}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 line-clamp-2">
              {essay.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {essay.content.substring(0, 150)}...
            </p>
            
            <div className="text-xs text-gray-500 mb-4">
              Created: {new Date(essay.createdAt).toLocaleDateString()}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {essay.content.length} characters
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(essay)}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(essay._id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEssays.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No essays found.</p>
        </div>
      )}
    </div>
  );
}
