import { useState, useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import axios from "axios";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
export default function ChatPanel() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const HandleMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage("");
    setLoading(true);
    const newChat = [...chat, { role: "user", content: userMessage }];
    setChat(newChat);

    try {
      const response = await axios.post(import.meta.env.VITE_GCP_URL, {
        input: userMessage,
      });

      console.log(response.data);

      if (response.status === 200) {
        setChat([...newChat, { role: "agent", content: response.data.answer }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setChat([
        ...newChat,
        {
          role: "agent",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      HandleMessage();
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {chat.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 px-6">
          <div className="max-w-3xl w-full text-center">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <img src="/flame_logo.svg" alt="logo" className="w-20 h-20" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to Faculty Assistant
            </h2>
            <p className="text-gray-400 mb-12 text-lg">
              I'm here to help you with faculty-related questions. Feel free to
              ask me anything!
            </p>

            <div className="w-full max-w-3xl mx-auto mb-8">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="w-full resize-none bg-gray-800 border border-gray-600 rounded-xl px-6 py-4 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] max-h-40 text-lg"
                  rows={1}
                  disabled={loading}
                />
                <div className="absolute right-4 bottom-3">
                  <button
                    onClick={HandleMessage}
                    disabled={!message.trim() || loading}
                    className="w-20 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105"
                  >
                    Send
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 mx-auto w-full md:w-3/4 mt-20">
            {chat.map((item, idx) => (
              <div key={idx} className={`flex gap-4 justify-start`}>
                {item.role === "agent" && (
                  <div className="flex items-center justify-center">
                    <Bot className="w-5 h-5 text-yellow-600" />
                  </div>
                )}
                {item.role === "user" && (
                  <div className="flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
                <div
                  className={`max-w-xs  px-5 py-2 rounded-2xl shadow-lg ${
                    item.role === "user"
                      ? "text-white rounded-br-md font-bold text-xl lg:max-w-4xl"
                      : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-md lg:max-w-2xl"
                  }`}
                >
                  <div className="prose prose-invert">
                    {item.role === "user" ? (
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {item.content}
                      </p>
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-4">
                <div className="flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-md px-5 py-2 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-gray-400">Searching...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-700 py-6">
            <div className="max-w-4xl mx-auto px-6">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="w-full resize-none bg-gray-700 border border-gray-600 rounded-xl px-5 py-4 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[52px] max-h-32"
                  rows={1}
                  disabled={loading}
                />
                <div className="absolute right-3 bottom-3">
                  <button
                    onClick={HandleMessage}
                    disabled={!message.trim() || loading}
                    className="w-20 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105"
                  >
                    Send
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
