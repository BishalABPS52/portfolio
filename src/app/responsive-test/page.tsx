import React from 'react';

export default function ResponsiveTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Responsive Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Mobile View</h2>
            <p className="text-gray-600">This content adapts to mobile screens</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Tablet View</h2>
            <p className="text-gray-600">This content adapts to tablet screens</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Desktop View</h2>
            <p className="text-gray-600">This content adapts to desktop screens</p>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Responsive Breakpoints</h2>
          <div className="space-y-2">
            <div className="block sm:hidden text-red-600 font-medium">Mobile (&lt; 640px)</div>
            <div className="hidden sm:block md:hidden text-blue-600 font-medium">Small (640px - 768px)</div>
            <div className="hidden md:block lg:hidden text-green-600 font-medium">Medium (768px - 1024px)</div>
            <div className="hidden lg:block xl:hidden text-purple-600 font-medium">Large (1024px - 1280px)</div>
            <div className="hidden xl:block text-orange-600 font-medium">Extra Large (≥ 1280px)</div>
          </div>
        </div>
      </div>
    </div>
  );
}