import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import MotivationalResponse from './components/MotivationalResponse';
import MusicRecommendations from './components/MusicRecommendations';
import ActivitySuggestions from './components/ActivitySuggestions';
import Footer from './components/Footer';
import { generateMotivationalResponse } from './services/openaiService';
import { getMusicRecommendations } from './services/spotifyService';
import { getActivitySuggestions } from './services/youtubeService';

function App() {
  const [userName, setUserName] = useState('');
  const [userMood, setUserMood] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [musicRecommendations, setMusicRecommendations] = useState([]);
  const [activitySuggestions, setActivitySuggestions] = useState([]);
  
  const handleUserSubmit = async (name, mood) => {
    setUserName(name);
    setUserMood(mood);
    setIsLoading(true);
    setIsSubmitted(true);
    
    try {
      // Get AI motivational response
      const response = await generateMotivationalResponse(name, mood);
      setMotivationalMessage(response);
      
      // Get recommendations in parallel
      const [musicData, activitiesData] = await Promise.all([
        getMusicRecommendations(mood),
        getActivitySuggestions(mood)
      ]);
      
      setMusicRecommendations(musicData);
      setActivitySuggestions(activitiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetApp = () => {
    setIsSubmitted(false);
    setUserName('');
    setUserMood('');
    setMotivationalMessage('');
    setMusicRecommendations([]);
    setActivitySuggestions([]);
  };
  
  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* Night Sky Background with Stars */}
      <div className="fixed inset-0">
        {/* Stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle
              before:content-[''] before:absolute before:w-full before:h-full 
              before:bg-white before:blur-sm before:rounded-full
              after:content-[''] after:absolute after:w-full after:h-full 
              after:bg-white after:blur-md after:rounded-full`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              transform: `scale(${Math.random() * 2 + 0.5})`,
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))'
            }}
          />
        ))}
        
        {/* Moon */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full shadow-2xl
          before:content-[''] before:absolute before:inset-0 before:rounded-full before:blur-sm before:bg-white/30">
          <div className="absolute top-0 right-0 w-20 h-20 bg-black rounded-full transform translate-x-2"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        
        {!isSubmitted ? (
          <UserInput onSubmit={handleUserSubmit} />
        ) : (
          <div className="mt-8 space-y-8">
            <MotivationalResponse 
              name={userName}
              mood={userMood}
              message={motivationalMessage}
              isLoading={isLoading}
            />
            
            {!isLoading && (
              <>
                <MusicRecommendations 
                  recommendations={musicRecommendations} 
                  isLoading={isLoading} 
                />
                
                <ActivitySuggestions 
                  suggestions={activitySuggestions} 
                  isLoading={isLoading} 
                />
                
                <div className="flex justify-center mt-12">
                  <button
                    onClick={resetApp}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                      text-white font-medium rounded-lg shadow-lg
                      hover:shadow-purple-500/50 hover:scale-105
                      focus:outline-none focus:ring-2 focus:ring-purple-500
                      transition-all duration-300 ease-in-out
                      animate-pulse-slow"
                  >
                    Start Over
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        
        <Footer />
      </div>
    </div>
  );
}

export default App;