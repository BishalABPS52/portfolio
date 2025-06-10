'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, Star } from 'lucide-react';

interface TechAnalyticsProps {
  className?: string;
}

const TechStackAnalytics = ({ className = '' }: TechAnalyticsProps) => {
  const analytics = {
    totalTechnologies: 24,
    advancedSkills: 8,
    intermediateSkills: 10,
    beginnerSkills: 6,
    yearsOfExperience: 3,
    projectsCompleted: 25,
    mostUsedTech: 'JavaScript',
    learningStreak: 15
  };

  const proficiencyData = [
    { level: 'Advanced', count: analytics.advancedSkills, percentage: 33 },
    { level: 'Intermediate', count: analytics.intermediateSkills, percentage: 42 },
    { level: 'Beginner', count: analytics.beginnerSkills, percentage: 25 }
  ];

  const getProgressColor = (index: number) => {
    if (index === 0) return 'bg-green-500';
    if (index === 1) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBadgeColor = (index: number) => {
    if (index === 0) return 'bg-green-500';
    if (index === 1) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl border bg-white border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Total Technologies
              </p>
              <p className="text-2xl font-bold text-blue-500">
                {analytics.totalTechnologies}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        {/* Years of Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl border bg-white border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Years of Experience
              </p>
              <p className="text-2xl font-bold text-green-500">
                {analytics.yearsOfExperience}+
              </p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        {/* Projects Completed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl border bg-white border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Projects Completed
              </p>
              <p className="text-2xl font-bold text-purple-500">
                {analytics.projectsCompleted}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>

        {/* Learning Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl border bg-white border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Learning Streak
              </p>
              <p className="text-2xl font-bold text-orange-500">
                {analytics.learningStreak} days
              </p>
            </div>
            <Star className="h-8 w-8 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Proficiency Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-xl border bg-white border-gray-200"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Skill Distribution
        </h3>
        <div className="space-y-4">
          {proficiencyData.map((item, index) => (
            <div key={item.level} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getBadgeColor(index)}`} />
                <span className="text-sm font-medium text-gray-700">
                  {item.level}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {item.count} skills
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    className={`h-full ${getProgressColor(index)}`}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechStackAnalytics;
