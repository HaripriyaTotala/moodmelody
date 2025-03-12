// src/services/youtubeService.js

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Map user mood to YouTube search queries
const getMoodSearchTerms = (mood) => {
  const moodLower = mood.toLowerCase();
  
  if (moodLower.includes('sad') || moodLower.includes('depress') || moodLower.includes('down')) {
    return 'uplifting craft activities, mood boosting art therapy';
  } else if (moodLower.includes('anxious') || moodLower.includes('stress') || moodLower.includes('worry')) {
    return 'calming mandala art, relaxing crafts for anxiety';
  } else if (moodLower.includes('angry') || moodLower.includes('frustrat') || moodLower.includes('mad')) {
    return 'stress relief crafts, art therapy for anger';
  } else if (moodLower.includes('happy') || moodLower.includes('joy') || moodLower.includes('excit')) {
    return 'creative DIY projects, fun home decor ideas';
  } else if (moodLower.includes('tired') || moodLower.includes('exhaust') || moodLower.includes('fatigue')) {
    return 'easy relaxing crafts, simple creative activities';
  } else {
    // Default for other moods
    return 'creative art projects, DIY mindfulness activities';
  }
};

// Get activity suggestions based on mood
export const getActivitySuggestions = async (mood) => {
  try {
    const searchQuery = getMoodSearchTerms(mood);
    
    const response = await fetch(
      `${API_URL}?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=4&key=${API_KEY}`,
      { method: 'GET' }
    );
    
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle
      }));
    } else {
      // Fallback to mock data if API fails
      return getMockActivitySuggestions();
    }
  } catch (error) {
    console.error('Error getting activity suggestions:', error);
    return getMockActivitySuggestions();
  }
};

// Mock data in case API fails
const getMockActivitySuggestions = () => {
  return [
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Easy DIY Mandala Art for Relaxation',
      description: 'Learn how to create beautiful mandala patterns that help reduce stress and anxiety.',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      channelTitle: 'Creative Arts Channel'
    },
    {
      videoId: 'xvFZjo5PgG0',
      title: '10-Minute Crafts for Mood Boosting',
      description: 'Quick and simple craft ideas that will instantly lift your spirits.',
      thumbnail: 'https://i.ytimg.com/vi/xvFZjo5PgG0/hqdefault.jpg',
      channelTitle: 'DIY Therapy'
    }
  ];
};