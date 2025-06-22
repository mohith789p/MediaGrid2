// AI Service for MediaGrid using Hugging Face API
import axios from 'axios';

// Define the response type from the AI service
export interface AIResponse {
  text: string;
  id: string;
  created: number;
}

// Define the API configuration
const API_URL = process.env.NEXT_PUBLIC_HF_API_URL || 'https://router.huggingface.co/nebius/v1/chat/completions';
const API_KEY = process.env.NEXT_PUBLIC_HF_TOKEN || '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'; // Default token for development
const MODEL = process.env.NEXT_PUBLIC_HF_MODEL || 'deepseek-ai/DeepSeek-R1-0528';

// Function to send a message to the AI service and get a response
export async function sendMessageToAI(message: string, history: Array<{role: string, content: string}> = []): Promise<AIResponse> {
  try {
    // Create the messages array with conversation history
    const messages = [
      { role: 'system', content: 'You are MediaGrid AI, a helpful assistant for the MediaGrid social media platform. You provide concise, accurate, and helpful responses. If you need to think through a complex problem, enclose your thinking process in <think> tags like this: <think>your thinking process here</think> followed by your final response. Only the content after the </think> tag will be shown to the user.' },
      ...history,
      { role: 'user', content: message }
    ];

    // Make the API request to Hugging Face
    const response = await axios.post(
      API_URL,
      {
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    // Extract the AI's response
    let aiMessage = response.data.choices[0].message.content;
    
    // Process the response to remove thinking part if present
    // This handles the format where thinking is enclosed in <think> tags
    const thinkEndMatch = aiMessage.match(/<\/think>\s*(.*)/s);
    if (thinkEndMatch && thinkEndMatch[1]) {
      // Extract only the content after </think>
      aiMessage = thinkEndMatch[1].trim();
    }
    
    return {
      text: aiMessage,
      id: response.data.id || `hf-${Date.now()}`,
      created: response.data.created || Date.now() / 1000
    };
  } catch (error) {
    console.error('Error calling AI service:', error);
    
    // Return a fallback response
    return {
      text: 'I apologize, but I encountered an issue processing your request. Please try again later.',
      id: 'error-' + Date.now(),
      created: Date.now() / 1000
    };
  }
}

// Function to check if the API key is configured
export function isAIConfigured(): boolean {
  return !!API_KEY;
}