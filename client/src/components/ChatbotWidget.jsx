import React, { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, SendHorizontal, X } from 'lucide-react';

const defaultWelcome = {
  role: 'assistant',
  content: 'Hi, I am QuickCart AI. Ask me about products, orders, and shopping help.',
};

const ChatbotWidget = ({
  apiUrl = 'http://localhost:5000/api/chatbot/message',
  title = 'QuickCart AI Assistant',
}) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([defaultWelcome]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || loading) return;

    const userMessage = { role: 'user', content: message };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: nextMessages,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Failed to get a response');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply || 'I could not generate a response right now.',
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: error.message || 'Something went wrong while contacting AI service.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-100">
      {open && (
        <div className="w-[calc(100vw-2rem)] max-w-[380px] h-[560px] max-h-[78vh] mb-3 rounded-2xl border border-[#d8def6] bg-white shadow-[0_20px_60px_rgba(10,25,62,0.2)] overflow-hidden flex flex-col animate-slide-up">
          <div className="px-4 py-3 bg-linear-to-r from-[#0f4c81] to-[#1f6aa5] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <h2 className="text-sm font-semibold leading-tight">{title}</h2>
                <p className="text-[11px] text-white/80">Online now</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-md hover:bg-white/15 transition flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[linear-gradient(160deg,#f8fbff_0%,#eef4ff_100%)]">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div key={`${msg.role}-${index}`} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-[#0f4c81] text-white rounded-br-sm'
                        : 'bg-white text-[#1f2d3d] border border-[#d9e3f8] rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-[#1f2d3d] border border-[#d9e3f8] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-[#e2e8f7] p-3 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 resize-none rounded-xl border border-[#d9e3f8] focus:border-[#1f6aa5] focus:ring-2 focus:ring-[#1f6aa5]/20 outline-none px-3 py-2.5 text-sm max-h-28"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="h-[42px] w-[42px] rounded-xl bg-[#0f4c81] text-white hover:bg-[#1f6aa5] disabled:opacity-45 disabled:cursor-not-allowed transition flex items-center justify-center"
              >
                <SendHorizontal size={17} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="h-14 w-14 rounded-full bg-[#0f4c81] text-white shadow-[0_10px_30px_rgba(15,76,129,0.45)] hover:scale-105 hover:bg-[#1f6aa5] transition-all flex items-center justify-center"
        aria-label="Toggle chatbot"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
};

export default ChatbotWidget;
