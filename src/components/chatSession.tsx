import React from 'react';
import { useParams } from 'react-router-dom';

interface ChatMessage {
  user: string;
  message: string;
}

const ChatSession: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();

  // Example: Fetch chat history or use local data based on sessionId
  const chatHistory: ChatMessage[] = [
    { user: 'User', message: 'Hello, ChatGPT!' },
    { user: 'ChatGPT', message: 'Hello there! How can I assist you today?' },
    // Add more messages as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Session {sessionId}</h1>
      <div className="space-y-4">
        {chatHistory.map((message, index) => (
          <div key={index} className={`p-2 ${message.user === 'User' ? 'bg-gray-200 text-right' : 'bg-blue-200'}`}>
            <strong>{message.user}: </strong> {message.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSession;

