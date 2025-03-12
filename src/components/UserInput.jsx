import React, { useState } from 'react';

const UserInput = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [mood, setMood] = useState('');
  const [nameError, setNameError] = useState('');
  const [moodError, setMoodError] = useState('');

  const validateInputs = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Please enter your name');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!mood.trim()) {
      setMoodError('Please describe how you feel');
      isValid = false;
    } else {
      setMoodError('');
    }
    
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateInputs()) {
      onSubmit(name, mood);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-6 border border-gray-800">
      <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center">
        How are you feeling today?
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 text-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
          {nameError && <p className="mt-1 text-sm text-red-500">{nameError}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">
            How do you feel?
          </label>
          <textarea
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="I'm feeling..."
            rows="3"
            className="w-full px-4 py-2 text-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
          {moodError && <p className="mt-1 text-sm text-red-500">{moodError}</p>}
        </div>
        
        <button 
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 
            text-white font-medium rounded-lg shadow-lg
            hover:shadow-purple-500/50 hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-purple-500
            transition-all duration-300 ease-in-out
            animate-pulse-slow cursor-pointer"
        >
          Begin
        </button>
      </form>
    </div>
  );
};

export default UserInput;