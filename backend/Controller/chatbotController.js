import { GoogleGenerativeAI } from '@google/generative-ai';

const buildPrompt = (history = [], message = '') => {
  const safeHistory = Array.isArray(history) ? history : [];

  const conversation = safeHistory
    .filter((item) => item && typeof item.content === 'string' && typeof item.role === 'string')
    .slice(-10)
    .map((item) => `${item.role === 'assistant' ? 'Assistant' : 'User'}: ${item.content}`)
    .join('\n');

  return [
    'You are a helpful shopping assistant for an ecommerce website called QuickCart.',
    'Keep responses concise, clear, and friendly.',
    conversation ? `Conversation so far:\n${conversation}` : '',
    `User: ${message}`,
    'Assistant:'
  ]
    .filter(Boolean)
    .join('\n\n');
};

const sendMessageToGemini = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'GEMINI_API_KEY is not configured' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = buildPrompt(history, String(message).trim());
    const result = await model.generateContent(prompt);
    const responseText = result?.response?.text?.() || 'Sorry, I could not generate a response.';

    return res.status(200).json({ success: true, reply: responseText });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to get AI response',
      error: error?.message || 'Unknown error',
    });
  }
};

export { sendMessageToGemini };
