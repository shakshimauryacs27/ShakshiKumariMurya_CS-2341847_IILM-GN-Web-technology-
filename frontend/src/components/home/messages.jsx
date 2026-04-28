import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "./home.css";
import { motion } from "framer-motion";
import Header from "./Header";
const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [searchParams] = useSearchParams();
  const conversationIdFromUrl = searchParams.get("conversationId");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("_id");

  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/chat/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  }, [token]);

  const fetchMessages = useCallback(async (conversationId) => {
    try {
      const res = await fetch(`http://localhost:8080/chat/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchConversations();
    }
  }, [token, fetchConversations]);

  useEffect(() => {
    if (conversationIdFromUrl) {
      const conversation = conversations.find(c => c._id === conversationIdFromUrl);
      if (conversation) {
        setSelectedConversation(conversation);
        fetchMessages(conversationIdFromUrl);
      }
    }
  }, [conversationIdFromUrl, conversations, fetchMessages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/chat/conversations/${selectedConversation._id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newMessage }),
      });

      if (res.ok) {
        const message = await res.json();
        setMessages(prev => [...prev, message]);
        setNewMessage("");
        scrollToBottom();
        fetchConversations(); // Update conversation list with new last message
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participants.find(p => p._id !== userId);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  return (
    <> <Header />
    <div className={`messages-container ${selectedConversation ? "chat-open" : ""}`}>
      <motion.div
  className="conversations-list"
  initial={{ x: -80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
        <h3>Your Conversations</h3>
        {conversations.length === 0 ? (
          <p>No conversations yet. Start chatting with someone!</p>
        ) : (
          conversations.map((conversation) => {
            const otherUser = getOtherParticipant(conversation);
            return (
              <div
                key={conversation._id}
                className={`conversation-item ${selectedConversation?._id === conversation._id ? "active" : ""}`}
                onClick={() => {
                  setSelectedConversation(conversation);
                  fetchMessages(conversation._id);
                }}
              >
                <img
                  src={otherUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt={otherUser?.name}
                  className="conversation-avatar"
                />
                <div className="conversation-info">
                  <h4>{otherUser?.name}</h4>
                  <p className="last-message">{conversation.lastMessage || "No messages yet"}</p>
                </div>
              </div>
            );
          })
        )}
      </motion.div>

      <div className="chat-area">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <button
                className="chat-back-btn"
                type="button"
                onClick={handleBackToConversations}
                aria-label="Back to conversations"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <img
                src={getOtherParticipant(selectedConversation)?.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt={getOtherParticipant(selectedConversation)?.name}
                className="chat-avatar"
              />
              <h3>{getOtherParticipant(selectedConversation)?.name}</h3>
            </div>

            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`message ${message.sender._id === userId ? "sent" : "received"}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={loading}
              />
              <button onClick={sendMessage} disabled={loading || !newMessage.trim()}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Messages;
