
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, MoreVertical } from "lucide-react";

interface ChatRoomProps {
  chatId: string;
  onBack: () => void;
}

export const ChatRoom = ({ chatId, onBack }: ChatRoomProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Chen",
      avatar: "SC",
      content: "Hey everyone! How's the project coming along?",
      timestamp: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      avatar: "AJ",
      content: "Going well! Just finished the wireframes.",
      timestamp: "10:32 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Mike Rodriguez",
      avatar: "MR",
      content: "Great work! I'll start on the backend APIs this afternoon.",
      timestamp: "10:35 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "Emma Davis",
      avatar: "ED",
      content: "Perfect timing! I'll have the UI components ready by tomorrow.",
      timestamp: "10:37 AM",
      isMe: false,
    },
    {
      id: 5,
      sender: "Me",
      avatar: "AJ",
      content: "Awesome team! Let's keep this momentum going 🚀",
      timestamp: "10:38 AM",
      isMe: true,
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "Me",
      avatar: "AJ",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const chatInfo = {
    general: { name: "General Chat", members: 4 },
    sarah: { name: "Sarah Chen", members: 2 },
    "project-alpha": { name: "Project Alpha", members: 3 },
    emma: { name: "Emma Davis", members: 2 },
  };

  const currentChat = chatInfo[chatId as keyof typeof chatInfo] || { name: "Chat", members: 1 };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              {currentChat.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-gray-900">{currentChat.name}</h2>
            <p className="text-sm text-gray-500">{currentChat.members} members</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-2 max-w-xs lg:max-w-md ${msg.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {!msg.isMe && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-xs font-semibold">
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-2xl px-4 py-2 ${
                msg.isMe 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                {!msg.isMe && (
                  <p className="text-xs font-semibold text-gray-600 mb-1">{msg.sender}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button 
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
