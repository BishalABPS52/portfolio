'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface Highscore {
  _id: string;
  username: string;
  score: number;
  questionsAnswered: number;
  gameCompletedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface HighscoresManagementClientProps {
  initialHighscores: Highscore[];
}

export default function HighscoresManagementClient({ initialHighscores }: HighscoresManagementClientProps) {
  const [highscores, setHighscores] = useState<Highscore[]>(initialHighscores);
  const [loading, setLoading] = useState(false);
  const [editingHighscore, setEditingHighscore] = useState<Highscore | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    score: '',
    questionsAnswered: '',
    gameCompletedAt: ''
  });

  const fetchHighscores = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/highscores');
      if (response.ok) {
        const data = await response.json();
        setHighscores(data);
      }
    } catch (error) {
      console.error('Error fetching highscores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const highscoreData = {
      username: formData.username,
      score: parseInt(formData.score),
      questionsAnswered: parseInt(formData.questionsAnswered),
      gameCompletedAt: formData.gameCompletedAt
    };

    try {
      const url = editingHighscore ? `/api/highscores/${editingHighscore._id}` : '/api/highscores';
      const method = editingHighscore ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(highscoreData),
      });

      if (response.ok) {
        fetchHighscores();
        resetForm();
        alert(editingHighscore ? 'Highscore updated successfully!' : 'Highscore created successfully!');
      } else {
        alert('Error saving highscore');
      }
    } catch (error) {
      console.error('Error saving highscore:', error);
      alert('Error saving highscore');
    }
  };

  const handleEdit = (highscore: Highscore) => {
    setEditingHighscore(highscore);
    setFormData({
      username: highscore.username,
      score: highscore.score.toString(),
      questionsAnswered: highscore.questionsAnswered.toString(),
      gameCompletedAt: new Date(highscore.gameCompletedAt).toISOString().slice(0, 16)
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this highscore?')) {
      try {
        const response = await fetch(`/api/highscores/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchHighscores();
          alert('Highscore deleted successfully!');
        } else {
          alert('Error deleting highscore');
        }
      } catch (error) {
        console.error('Error deleting highscore:', error);
        alert('Error deleting highscore');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      score: '',
      questionsAnswered: '',
      gameCompletedAt: ''
    });
    setEditingHighscore(null);
    setIsFormOpen(false);
  };

  const filteredHighscores = highscores.filter(highscore =>
    highscore.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Header Controls */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Highscore
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Scores
          </h3>
          <p className="text-3xl font-bold text-blue-600">{highscores.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Highest Score
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {highscores.length > 0 ? Math.max(...highscores.map(h => h.score)) : 0}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Average Score
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {highscores.length > 0 
              ? Math.round(highscores.reduce((sum, h) => sum + h.score, 0) / highscores.length)
              : 0
            }
          </p>
        </div>
      </div>

      {/* Highscores Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Completed At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHighscores.map((highscore, index) => (
                <motion.tr
                  key={highscore._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {highscore.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">
                      {highscore.score}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {highscore.questionsAnswered}/15
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(highscore.gameCompletedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(highscore)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(highscore._id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHighscores.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No highscores found.</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingHighscore ? 'Edit Highscore' : 'Add New Highscore'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Score
                </label>
                <input
                  type="number"
                  value={formData.score}
                  onChange={(e) => setFormData({...formData, score: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Questions Answered
                </label>
                <input
                  type="number"
                  value={formData.questionsAnswered}
                  onChange={(e) => setFormData({...formData, questionsAnswered: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  max="15"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Game Completed At
                </label>
                <input
                  type="datetime-local"
                  value={formData.gameCompletedAt}
                  onChange={(e) => setFormData({...formData, gameCompletedAt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingHighscore ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}