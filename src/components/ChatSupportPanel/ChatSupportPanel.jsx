import React, { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import "./chatPanel.css";

const ChatSupportPanel = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today? 😊" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thanks for your message! We'll get back soon." }
      ]);
    }, 900);

    setInput("");
  };

  return (
    <div className="chat-overlay">
      <div className="chat-panel">
        <div className="chat-header">
          <h3>Chat Support</h3>
          <FaTimes className="close-btn" onClick={onClose} />
        </div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="chat-input-box">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
          />
          <button onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupportPanel;
