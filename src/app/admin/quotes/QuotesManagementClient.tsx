'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Quote {
  _id: string;
  text: string;
  language: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface QuotesManagementClientProps {
  initialQuotes: Quote[];
}

export default function QuotesManagementClient({ initialQuotes }: QuotesManagementClientProps) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [formData, setFormData] = useState({
    text: '',
    language: 'english' as 'english' | 'nepali' | 'mixed',
    author: 'Bishal Shrestha'
  });

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes');
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingQuote ? `/api/quotes/${editingQuote._id}` : '/api/quotes';
      const method = editingQuote ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchQuotes();
        resetForm();
        alert(editingQuote ? 'Quote updated successfully!' : 'Quote created successfully!');
      } else {
        alert('Error saving quote');
      }
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Error saving quote');
    }
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setFormData({
      text: quote.text,
      language: quote.language as 'english' | 'nepali' | 'mixed',
      author: quote.author
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      try {
        const response = await fetch(`/api/quotes/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchQuotes();
          alert('Quote deleted successfully!');
        } else {
          alert('Error deleting quote');
        }
      } catch (error) {
        console.error('Error deleting quote:', error);
        alert('Error deleting quote');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      text: '',
      language: 'english',
      author: 'Bishal Shrestha'
    });
    setEditingQuote(null);
    setIsFormOpen(false);
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || quote.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quotes Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add New Quote
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search quotes..."
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

      {/* Quote Form Modal */}
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">
              {editingQuote ? 'Edit Quote' : 'Add New Quote'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quote Text
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  rows={4}
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
                  {editingQuote ? 'Update' : 'Create'} Quote
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Quotes</h3>
          <p className="text-3xl font-bold text-blue-600">{quotes.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">English</h3>
          <p className="text-3xl font-bold text-green-600">
            {quotes.filter(q => q.language === 'english').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Nepali</h3>
          <p className="text-3xl font-bold text-purple-600">
            {quotes.filter(q => q.language === 'nepali').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Mixed</h3>
          <p className="text-3xl font-bold text-orange-600">
            {quotes.filter(q => q.language === 'mixed').length}
          </p>
        </div>
      </div>

      {/* Quotes List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuotes.map((quote) => (
          <motion.div
            key={quote._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                quote.language === 'english' ? 'bg-blue-100 text-blue-800' :
                quote.language === 'nepali' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {quote.language.charAt(0).toUpperCase() + quote.language.slice(1)}
              </span>
            </div>
            
            <blockquote className="text-gray-800 mb-4 italic">
              "{quote.text}"
            </blockquote>
            
            <div className="text-sm text-gray-600 mb-4">
              — {quote.author}
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              Created: {new Date(quote.createdAt).toLocaleDateString()}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(quote)}
                className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(quote._id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No quotes found.</p>
        </div>
      )}
    </div>
  );
}
