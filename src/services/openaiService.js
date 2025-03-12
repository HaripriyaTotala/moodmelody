// src/services/openaiService.js

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateMotivationalResponse = async (name, mood) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a deeply empathetic emotional support coach who can respond in multiple languages. Detect the language from the user's mood input and respond in the same language. If the input is in English, randomly choose to respond in English or provide a bilingual response (English + Hindi/Telugu/Kannada).

            Follow these emotional guidelines for different moods:

            For sad/depressed moods:
            - Start with deep emotional validation ("I can feel how heavy this is for you...")
            - Share a personal-feeling message of hope
            - Suggest culturally appropriate comfort activities
            - End with a gentle, warm encouragement
            - For Indian users, consider suggesting activities like meditation, family time, or traditional comfort practices

            For anxious/stressed moods:
            - Begin with calming validation ("Your anxiety is a valid response...")
            - Offer both modern and traditional calming techniques
            - Include breathing exercises or mudras
            - Remind them of their inner strength
            - Consider suggesting yoga or meditation practices

            For angry/frustrated moods:
            - Acknowledge the depth of their feelings with respect
            - Suggest both physical and spiritual outlets
            - Offer wisdom from various cultural perspectives
            - End with calming, grounding suggestions
            - Include traditional anger management techniques

            For happy/excited moods:
            - Match their joyful energy
            - Celebrate their happiness with cultural context
            - Suggest ways to spread joy to others
            - Include traditional celebrations or expressions of joy
            - Encourage gratitude practices

            For tired/exhausted moods:
            - Show deep understanding of their fatigue
            - Blend modern and traditional rest suggestions
            - Offer gentle self-care practices
            - Include restorative yoga or relaxation techniques
            - Remind them that rest is sacred

            Always:
            - Use their name with cultural respect
            - Keep responses warm and personal
            - Include one practical suggestion
            - If responding bilingually, provide translation
            - Consider cultural context in suggestions
            - Make emotional connection genuine and deep`
          },
          {
            role: "user",
            content: `My name is ${name} and I'm feeling: "${mood}". Please provide me with a personalized response.`
          }
        ],
        max_tokens: 300,
        temperature: 0.8
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('No response from OpenAI API');
    }
  } catch (error) {
    console.error('Error generating motivational response:', error);
    return getMoodBasedFallbackResponse(mood, name);
  }
};

// Provide mood-specific fallback responses
const getMoodBasedFallbackResponse = (mood, name) => {
  const moodLower = mood.toLowerCase();
  
  if (moodLower.includes('sad') || moodLower.includes('depress')) {
    return `${name}, I hear how difficult things are right now. Remember that you've made it through tough times before, and this too shall pass. Consider reaching out to a friend or doing something gentle and kind for yourself today.`;
  } else if (moodLower.includes('anxious') || moodLower.includes('stress')) {
    return `${name}, I understand you're feeling anxious. Try taking three deep breaths - in for 4 counts, out for 8. Remember that you are safe in this moment, and this feeling is temporary.`;
  } else if (moodLower.includes('angry') || moodLower.includes('frustrat')) {
    return `${name}, your anger is valid and understandable. Consider channeling this energy into something physical, like a brisk walk or some stretching. Then you can approach the situation with a clearer mind.`;
  } else if (moodLower.includes('happy') || moodLower.includes('joy')) {
    return `That's wonderful, ${name}! Your happiness is contagious, and you deserve this joy. Why not share this positive energy by doing something nice for someone else today?`;
  } else if (moodLower.includes('tired') || moodLower.includes('exhaust')) {
    return `${name}, it's completely okay to feel tired. Your body and mind are telling you something important. Give yourself permission to take a proper rest - even a 10-minute break can help restore your energy.`;
  } else {
    return `${name}, thank you for sharing how you're feeling. Remember that all emotions are valid and temporary. Take a moment to be kind to yourself today - you deserve it.`;
  }
};