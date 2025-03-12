const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const API_URL = 'https://api.spotify.com/v1';


const getAccessToken = async () => {
  try {
    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
      },
      body: 'grant_type=client_credentials'
    };

    const response = await fetch(TOKEN_URL, authOptions);
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

// Define mood-specific playlists for each language with verified playlists
const moodPlaylists = {
  sad: {
    english: {
      id: '37i9dQZF1DX7qK8ma5wgG1',
      name: 'Sad Hours',
      description: 'Songs to let it all out',
      externalUrl: 'https://open.spotify.com/playlist/5muSk2zfQ3LI70S64jbrX7'
    },
    hindi: {
      id: '37i9dQZF1DWTwnEm1IYyoj',
      name: 'Bollywood Sad Songs',
      description: 'Best Hindi sad songs collection',
      externalUrl: 'https://open.spotify.com/genre/0JQ5DAqbMKFGTIdqXPDTSL'
    }
  },
  happy: {
    english: {
      id: '37i9dQZF1DXdPec7aLTmlC',
      name: 'Happy Hits!',
      description: 'Hits to make you smile!',
      externalUrl: 'https://open.spotify.com/playlist/222IptTOxogeUBi0m1Yqwd'
    },
    hindi: {
      id: '37i9dQZF1DXd8cOUiye1o2',
      name: 'Happy Vibes',
      description: 'Best Hindi Happy Vibes',
      externalUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWTwbZHrJRIgD'
    }
  },
  anxious: {
    english: {
      id: '37i9dQZF1DWXe9gFZP0gtP',
      name: 'Peaceful Piano',
      description: 'Relax with peaceful piano',
      externalUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP'
    },
    hindi: {
      id: '37i9dQZF1DX8HTMCdWqk8V',
      name: 'Bollywood Calm',
      description: 'Peaceful Hindi songs',
      externalUrl: 'https://open.spotify.com/playlist/2ToSpP0GXbG98QRuXC5Kyo'
    }
  },
  tired: {
    english: {
      id: '37i9dQZF1DWZd79rJ6a7lp',
      name: 'Sleep',
      description: 'Gentle ambient music to help you sleep',
      externalUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp'
    },
    hindi: {
      id: '37i9dQZF1DX56qfiUZBncF',
      name: 'Hindi Relax',
      description: 'Relaxing Hindi songs',
      externalUrl: 'https://open.spotify.com/playlist/6X3wpjdFbD8PlTISUIPT2c'
    }
  }
};

// Get music recommendations based on mood
export const getMusicRecommendations = async (mood) => {
  const moodLower = mood.toLowerCase();

  // Helper function to determine mood category
  const getMoodCategory = (mood) => {
    if (moodLower.includes('sad') || moodLower.includes('depress') || 
        moodLower.includes('upset') || moodLower.includes('hurt')) {
      return 'sad';
    } 
    else if (moodLower.includes('happy') || moodLower.includes('joy') || 
             moodLower.includes('excited') || moodLower.includes('good')) {
      return 'happy';
    } 
    else if (moodLower.includes('anxious') || moodLower.includes('stress') || 
             moodLower.includes('worried') || moodLower.includes('tension')) {
      return 'anxious';
    } 
    else if (moodLower.includes('tired') || moodLower.includes('exhaust') || 
             moodLower.includes('sleepy') || moodLower.includes('lazy')) {
      return 'tired';
    }
    return 'happy'; // default mood
  };

  try {
    const moodCategory = getMoodCategory(mood);
    const playlists = moodPlaylists[moodCategory];
    
    // Return playlists for English and Hindi only
    return {
      english: [playlists.english],
      hindi: [playlists.hindi]
    };
  } catch (error) {
    console.error('Error getting mood playlists:', error);
    // Return default playlists if there's an error
    const defaultPlaylists = moodPlaylists.happy;
    return {
      english: [defaultPlaylists.english],
      hindi: [defaultPlaylists.hindi]
    };
  }
};