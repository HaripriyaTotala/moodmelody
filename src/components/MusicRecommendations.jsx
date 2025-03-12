import React from 'react';

const MusicRecommendations = ({ recommendations, isLoading }) => {
  if (isLoading || !recommendations) return null;

  const handlePlaylistClick = (externalUrl) => {
    window.open(externalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <div className="gradient-card rounded-2xl bg-gray-900/50 backdrop-blur-sm shadow-lg p-6 md:p-8 border border-gray-800">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center animate-float">
          <span className="mr-2">🎵</span> Playlists for Your Mood
        </h2>
        
        {/* Language sections */}
        {Object.entries(recommendations).map(([language, playlists]) => (
          <div key={language} className="mb-8 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 capitalize hover:text-purple-400 transition-colors duration-300">
              {language} Music
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {playlists.map((playlist, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 rounded-xl shadow-md p-4 cursor-pointer
                    hover:bg-gray-700/50 hover:shadow-xl hover:scale-105 hover:shadow-purple-500/20
                    transition-all duration-300 ease-in-out"
                  onClick={() => handlePlaylistClick(playlist.externalUrl)}
                >
                  <h4 className="font-medium text-white text-lg mb-2">{playlist.name}</h4>
                  <p className="text-sm text-gray-400 mb-3">{playlist.description}</p>
                  <div className="text-sm text-purple-400 flex items-center group">
                    <svg className="w-4 h-4 mr-1 group-hover:text-purple-300 transition-colors duration-300" 
                         viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.491-1.093.251-3.051-1.86-6.781-2.28-11.221-1.26-.42.12-.84-.15-.96-.57-.12-.42.15-.84.57-.96 4.891-1.11 9.021-.63 12.452 1.44.371.24.491.721.251 1.093z"/>
                    </svg>
                    <span className="group-hover:text-black-300 transition-colors duration-300">
                      Open Playlist
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicRecommendations;