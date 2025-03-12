import React from 'react';

const ArticleRecommendations = ({ recommendations, isLoading }) => {
  if (isLoading || recommendations.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="gradient-card rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">📖</span> Articles for Reflection
        </h2>
        
        <div className="space-y-4">
          {recommendations.map((article, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover-lift p-4 flex flex-col md:flex-row"
            >
              {article.urlToImage && (
                <div className="md:w-1/4 flex-shrink-0">
                  <img 
                    src={article.urlToImage} 
                    alt={article.title} 
                    className="w-full h-32 md:h-full object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className={`${article.urlToImage ? 'md:w-3/4 md:pl-4 mt-4 md:mt-0' : 'w-full'}`}>
                <h3 className="font-medium text-gray-800">{article.title}</h3>
                
                {article.source && (
                  <div className="mt-1 text-xs text-gray-500 flex items-center">
                    <span className="font-medium">{article.source}</span>
                    {article.publishedAt && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                )}
                
                {article.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {article.description}
                  </p>
                )}
                
                {article.url && (
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-purple-600 hover:text-purple-800"
                  >
                    Read more →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleRecommendations;