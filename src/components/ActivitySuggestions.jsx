import React from 'react';

const ActivitySuggestions = ({ suggestions, isLoading }) => {
  if (isLoading || suggestions.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="gradient-card rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">🎨</span> Activities to Try
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestions.map((activity, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover-lift"
            >
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activity.videoId}`}
                  title={activity.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-800 line-clamp-2">{activity.title}</h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                <a 
                  href={`https://www.youtube.com/watch?v=${activity.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-purple-600 hover:text-purple-800"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySuggestions;