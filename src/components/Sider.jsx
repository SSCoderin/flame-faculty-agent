import { useState, useRef } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

export default function Sider() {
  const guideinfo = [
    { content: "Know about the faculty" },
    { content: "Explore faculty research papers" },
  ];

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendmessage = async (e) => {
    console.log("Sending message...");

    if (!message) {
      alert("Please enter a message before sending.");
      return;
    }

    setIsSending(true);
    try {
      const reponse = await axios.post(import.meta.env.VITE_GCP_URL_MSG, {
        user: name ? name : "Anonymous",
        message: message,
      });
      if (reponse.data.success) {
        alert("Thank you for your Suggestion!");
        setName("");
        setMessage("");
      
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-4">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row items-center gap-3 border border-amber-400 rounded-xl px-6 py-3 bg-gray-800 shadow-md">
          <img src="/flame_logo.svg" alt="logo" className="w-12 h-12" />
          <div className="text-lg font-bold tracking-wide">
            Flame Faculty Agent
          </div>
        </div>

        <div className="flex flex-col w-full pt-10">
          <h2 className="text-base font-semibold text-amber-300 mb-3 uppercase tracking-wide">
            How to use
          </h2>
          <ul className="space-y-3">
            {guideinfo.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 p-3 border border-gray-700 bg-gray-800 rounded-lg hover:border-amber-400 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              >
                <span className="text-sm">{item.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full mt-10">
        <h2 className="text-base font-semibold text-amber-300 mb-3 uppercase tracking-wide">
          Suggestion
        </h2>
        <form className="space-y-4">
          <div>
            <input
              id="from_name"
              type="text"
              name="name"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-amber-400 focus:border-amber-400"
            />
          </div>
          <div>
            <TextareaAutosize
              id="message"
              name="message"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md h-24 resize-none focus:ring-amber-400 focus:border-amber-400 overflow-y-auto "
              minRows={4}
              maxRows={8}
            />
          </div>
          <button
            onClick={(e) => sendmessage(e)}
            disabled={isSending}
            className="w-full py-2 px-4 bg-amber-500 text-gray-900 font-semibold rounded-md hover:bg-amber-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? "Sending..." : "Send Suggestion"}
          </button>
        </form>
      </div>
    </div>
  );
}
