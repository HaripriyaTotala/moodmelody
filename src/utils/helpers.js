// src/utils/helpers.js

// Format date to readable format
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Truncate text to specified length
  export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Get color based on mood
  export const getMoodColor = (mood) => {
    const moodLower = mood.toLowerCase();
    
    if (moodLower.includes('sad') || moodLower.includes('depress') || moodLower.includes('down')) {
      return 'from-blue-500 to-indigo-600';
    } else if (moodLower.includes('anxious') || moodLower.includes('stress') || moodLower.includes('worry')) {
      return 'from-purple-500 to-indigo-600';
    } else if (moodLower.includes('angry') || moodLower.includes('frustrat') || moodLower.includes('mad')) {
      return 'from-red-500 to-orange-500';
    } else if (moodLower.includes('happy') || moodLower.includes('joy') || moodLower.includes('excit')) {
      return 'from-yellow-400 to-orange-500';
    } else if (moodLower.includes('tired') || moodLower.includes('exhaust') || moodLower.includes('fatigue')) {
      return 'from-green-500 to-teal-500';
    } else {
      // Default color scheme
      return 'from-purple-600 to-blue-600';
    }
  };
  
  // Parse error messages from APIs
  export const parseErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return error.message || 'An unknown error occurred';
  };