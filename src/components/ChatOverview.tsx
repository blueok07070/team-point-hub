
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Users } from "lucide-react";
import { ChatRoom } from "./ChatRoom";

export const ChatOverview = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const chats = [
    {
      id: "general",
      name: "General Chat",
      type: "group",
      lastMessage: "Great work on the project everyone! 🎉",
      lastMessageTime: "2 min ago",
      unreadCount: 3,
      avatar: "GC",
      members: 4,
    },
    {
      id: "sarah",
      name: "Sarah Chen",
      type: "direct",
      lastMessage: "The designs look great! When can we review them?",
      lastMessageTime: "15 min ago",
      unreadCount: 1,
      avatar: "SC",
    },
    {
      id: "project-alpha",
      name: "Project Alpha",
      type: "group",
      lastMessage: "Mike: I'll have the backend ready by Friday",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      avatar: "PA",
      members: 3,
    },
    {
      id: "emma",
      name: "Emma Davis",
      type: "direct",
      lastMessage: "Thanks for the feedback!",
      lastMessageTime: "2 hours ago",
      unreadCount: 0,
      avatar: "ED",
    },
  ];

  if (selectedChat) {
    return <ChatRoom chatId={selectedChat} onBack={() => setSelectedChat(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
        <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
          <Users className="w-4 h-4 mr-1" />
          New Group
        </Button>
      </div>

      <div className="space-y-2">
        {chats.map((chat) => (
          <Card 
            key={chat.id} 
            className="cursor-pointer hover:shadow-md transition-shadow border-0 bg-white"
            onClick={() => setSelectedChat(chat.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className={`font-semibold text-white ${
                      chat.type === "group" ? "bg-gradient-to-br from-green-500 to-green-600" : "bg-gradient-to-br from-blue-500 to-blue-600"
                    }`}>
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.type === "group" && (
                    <div className="absolute -bottom-1 -right-1 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.members}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center py-8">
        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Start chatting with your team!</p>
      </div>
    </div>
  );
};
