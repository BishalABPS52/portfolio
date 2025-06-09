'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Design {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface DesignsManagementClientProps {
  initialDesigns: Design[];
}

export default function DesignsManagementClient({ initialDesigns }: DesignsManagementClientProps) {
  const [designs, setDesigns] = useState<Design[]>(initialDesigns);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tags: ''
  });

  const fetchDesigns = async () => {
    try {
      const response = await fetch('/api/designs');
      if (response.ok) {
        const data = await response.json();
        setDesigns(data);
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const designData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      const url = editingDesign ? `/api/designs/${editingDesign._id}` : '/api/designs';
      const method = editingDesign ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData),
      });

      if (response.ok) {
        fetchDesigns();
        resetForm();
        alert(editingDesign ? 'Design updated successfully!' : 'Design created successfully!');
      } else {
        alert('Error saving design');
      }
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Error saving design');
    }
  };

  const handleEdit = (design: Design) => {
    setEditingDesign(design);
    setFormData({
      title: design.title,
      description: design.description,
      imageUrl: design.imageUrl,
      tags: design.tags.join(', ')
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this design?')) {
      try {
        const response = await fetch(`/api/designs/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchDesigns();
          alert('Design deleted successfully!');
        } else {
          alert('Error deleting design');
        }
      } catch (error) {
        console.error('Error deleting design:', error);
        alert('Error deleting design');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      tags: ''
    });
    setEditingDesign(null);
    setIsFormOpen(false);
  };

  const filteredDesigns = designs.filter(design =>
    design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Designs Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add New Design
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search designs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Design Form Modal */}
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
              {editingDesign ? 'Edit Design' : 'Add New Design'}
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
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
                  placeholder="UI/UX, Logo, Branding"
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
                  {editingDesign ? 'Update' : 'Create'} Design
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Designs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDesigns.map((design) => (
          <motion.div
            key={design._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={design.imageUrl}
                alt={design.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                {design.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {design.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {design.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {design.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{design.tags.length - 3}
                  </span>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Created: {new Date(design.createdAt).toLocaleDateString()}
              </div>
              
              <div className="flex justify-between items-center">
                <a
                  href={design.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  View Full →
                </a>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(design)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(design._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDesigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No designs found.</p>
        </div>
      )}
    </div>
  );
}
