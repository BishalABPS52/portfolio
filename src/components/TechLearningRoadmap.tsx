'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowRight, Clock, Star } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface TechLearningRoadmapProps {
  className?: string;
}

const TechLearningRoadmap = ({ className = '' }: TechLearningRoadmapProps) => {
  const roadmapItems: RoadmapItem[] = [
    {
      id: '1',
      title: 'Master TypeScript Advanced Features',
      description: 'Deep dive into generics, utility types, and conditional types',
      status: 'in-progress',
      estimatedTime: '2 weeks',
      priority: 'high',
      category: 'Languages'
    },
    {
      id: '2',
      title: 'Learn Node.js & Express',
      description: 'Build RESTful APIs and server-side applications',
      status: 'planned',
      estimatedTime: '3 weeks',
      priority: 'high',
      category: 'Backend'
    },
    {
      id: '3',
      title: 'Docker & Containerization',
      description: 'Learn containerization and deployment strategies',
      status: 'planned',
      estimatedTime: '2 weeks',
      priority: 'medium',
      category: 'DevOps'
    },
    {
      id: '4',
      title: 'Advanced React Patterns',
      description: 'Compound components, render props, and custom hooks',
      status: 'completed',
      estimatedTime: '2 weeks',
      priority: 'high',
      category: 'Frontend'
    },
    {
      id: '5',
      title: 'GraphQL & Apollo',
      description: 'Modern API development and data fetching',
      status: 'planned',
      estimatedTime: '3 weeks',
      priority: 'medium',
      category: 'Backend'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Circle className="h-5 w-5 text-blue-500 animate-pulse" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={className}>
      <div className="space-y-6">
        {roadmapItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Connection Line */}
            {index < roadmapItems.length - 1 && (
              <div className="absolute left-2.5 top-12 w-0.5 h-16 bg-gray-200" />
            )}
            
            <div className="flex items-start space-x-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(item.status)}
              </div>
              
              {/* Content */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                      {item.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{item.estimatedTime}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.category}
                    </span>
                  </div>
                  
                  {item.status === 'completed' && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Star className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                  
                  {item.status === 'in-progress' && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <ArrowRight className="h-4 w-4" />
                      <span className="text-sm font-medium">In Progress</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: roadmapItems.length * 0.1 + 0.2 }}
        className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Learning Progress Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {roadmapItems.filter(item => item.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {roadmapItems.filter(item => item.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {roadmapItems.filter(item => item.status === 'planned').length}
            </div>
            <div className="text-sm text-gray-600">Planned</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TechLearningRoadmap;
