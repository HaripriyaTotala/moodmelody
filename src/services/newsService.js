// src/services/newsService.js

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = 'https://newsapi.org/v2/everything';

// Map user mood to article topics
const getMoodTopics = (mood) => {
  const moodLower = mood.toLowerCase();
  
  if (moodLower.includes('sad') || moodLower.includes('depress') || moodLower.includes('down')) {
    return 'positive psychology, happiness, success stories';
  } else if (moodLower.includes('anxious') || moodLower.includes('stress') || moodLower.includes('worry')) {
    return 'mindfulness, meditation, stress management';
  } else if (moodLower.includes('angry') || moodLower.includes('frustrat') || moodLower.includes('mad')) {
    return 'emotional intelligence, conflict resolution, peace';
  } else if (moodLower.includes('happy') || moodLower.includes('joy') || moodLower.includes('excit')) {
    return 'inspiration, achievement, positive news';
  } else if (moodLower.includes('tired') || moodLower.includes('exhaust') || moodLower.includes('fatigue')) {
    return 'energy, wellness, rest, productivity tips';
  } else {
    // Default for other moods
    return 'personal development, wellbeing, emotional health';
  }
};

// Get article recommendations based on mood
export const getArticleRecommendations = async (mood) => {
  try {
    const searchQuery = getMoodTopics(mood);
    
    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(searchQuery)}&language=en&sortBy=relevancy&pageSize=4&apiKey=${API_KEY}`,
      { method: 'GET' }
    );
    
    const data = await response.json();
    
    if (data.articles && data.articles.length > 0) {
      return data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        source: article.source.name,
        publishedAt: article.publishedAt
      }));
    } else {
      // Fallback to mock data if API fails
      return getMockArticleRecommendations(mood);
    }
  } catch (error) {
    console.error('Error getting article recommendations:', error);
    return getMockArticleRecommendations(mood);
  }
};

// Alternatively use Medium RSS feed
export const getMediumArticles = async (topic) => {
  try {
    // Using a CORS proxy to fetch from Medium RSS
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`https://medium.com/feed/tag/${topic}`)}`,
      { method: 'GET' }
    );
    
    const data = await response.json();
    // Would need to parse XML response here
    
    return getMockArticleRecommendations(); // Fallback for now
  } catch (error) {
    console.error('Error getting Medium articles:', error);
    return getMockArticleRecommendations();
  }
};

// Mock data in case API fails
const getMockArticleRecommendations = (mood) => {
  // Different mock articles based on mood
  const moodLower = mood?.toLowerCase() || '';
  
  if (moodLower.includes('sad') || moodLower.includes('depress')) {
    return [
      {
        title: '7 Science-Backed Ways to Boost Your Mood',
        description: 'Small steps that can make a big difference in how you feel every day.',
        url: 'https://example.com/boost-mood',
        urlToImage: 'https://source.unsplash.com/random/800x600/?happy',
        source: 'Wellbeing Magazine',
        publishedAt: '2024-02-15T08:30:00Z'
      },
      {
        title: 'Finding Joy in Small Things: A Guide to Daily Happiness',
        description: 'Practical ways to notice and appreciate the little moments that matter.',
        url: 'https://example.com/daily-joy',
        urlToImage: 'https://source.unsplash.com/random/800x600/?joy',
        source: 'Mindful Living',
        publishedAt: '2024-02-10T14:15:00Z'
      }
    ];
  } else {
    // Default articles
    return [
      {
        title: 'The Science of Emotional Wellbeing',
        description: 'How understanding your emotions can lead to better mental health and happiness.',
        url: 'https://example.com/emotional-wellbeing',
        urlToImage: 'https://source.unsplash.com/random/800x600/?emotions',
        source: 'Psychology Today',
        publishedAt: '2024-02-20T10:00:00Z'
      },
      {
        title: 'Mindfulness Practices for Everyday Life',
        description: 'Simple techniques to stay present and reduce stress in your daily routine.',
        url: 'https://example.com/mindfulness-daily',
        urlToImage: 'https://source.unsplash.com/random/800x600/?mindfulness',
        source: 'Healthy Mind',
        publishedAt: '2024-02-18T09:45:00Z'
      }
    ];
  }
};