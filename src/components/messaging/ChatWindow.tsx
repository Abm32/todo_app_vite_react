import React, { useState, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useSocket } from '../../hooks/useSocket';
import { Message } from '../../types';

interface Props {
  recipientId: string;
  chatId: string;
}

export const ChatWindow: React.FC<Props> = ({ recipientId, chatId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('message', (newMessage: Message) => {
        setMessages(prev => [...prev, newMessage]);
      });
    }
  }, [socket]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit('send_message', {
        chatId,
        recipientId,
        content: message,
      });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.senderId === recipientId ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                msg.senderId === recipientId
                  ? 'bg-gray-100'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};