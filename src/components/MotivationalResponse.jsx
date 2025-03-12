import React from 'react';

const MotivationalResponse = ({ name, mood, message, isLoading }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="gradient-card rounded-2xl shadow-lg p-6 md:p-8 bg-gray-600">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Hey {name}! 👋
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg inline-block">
              <p className="text-gray-600 italic">"{mood}"</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
              <p className="text-gray-800 whitespace-pre-line">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MotivationalResponse;