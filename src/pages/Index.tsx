
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MessageCircle, Settings, CheckCircle2, Calendar, User } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { TaskCreateModal } from "@/components/TaskCreateModal";
import { ChatOverview } from "@/components/ChatOverview";
import { GroupSettings } from "@/components/GroupSettings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Mock data - in a real app this would come from a backend
  const userPoints = 127;
  const userName = "Alex Johnson";
  
  const myTasks = [
    { id: 1, title: "Review project proposal", dueDate: "Today", priority: "high", completed: false },
    { id: 2, title: "Update team on progress", dueDate: "Tomorrow", priority: "normal", completed: false },
    { id: 3, title: "Prepare presentation slides", dueDate: "Friday", priority: "high", completed: false },
  ];

  const groupTasks = [
    { id: 4, title: "Design new mockups", assignee: "Sarah Chen", dueDate: "Today", priority: "high" },
    { id: 5, title: "Code review session", assignee: "Mike Rodriguez", dueDate: "Tomorrow", priority: "normal" },
    { id: 6, title: "Client meeting prep", assignee: "Emma Davis", dueDate: "Wednesday", priority: "normal" },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">TeamHub</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1 rounded-full">
            <span className="text-amber-600">⭐</span>
            <span className="font-semibold text-amber-700">{userPoints}</span>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">AJ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* My Tasks Section */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <User className="w-5 h-5 text-blue-600" />
            <span>My Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {myTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full hover:border-blue-500 transition-colors cursor-pointer"></div>
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.dueDate}</p>
                </div>
              </div>
              {task.priority === "high" && (
                <Badge variant="destructive" className="text-xs">High</Badge>
              )}
            </div>
          ))}
          <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            View All My Tasks
          </Button>
        </CardContent>
      </Card>

      {/* Group Tasks Section */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span>Group Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {groupTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-green-100 text-green-600 text-xs font-semibold">
                    {task.assignee.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.assignee} • {task.dueDate}</p>
                </div>
              </div>
              {task.priority === "high" && (
                <Badge variant="destructive" className="text-xs">High</Badge>
              )}
            </div>
          ))}
          <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
            View All Group Tasks
          </Button>
        </CardContent>
      </Card>

      {/* Quick Add Task Button */}
      <Button 
        onClick={() => setIsTaskModalOpen(true)}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Task
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="p-6 pb-20">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "chats" && <ChatOverview />}
          {activeTab === "settings" && <GroupSettings />}
        </div>
        
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <TaskCreateModal 
          isOpen={isTaskModalOpen} 
          onClose={() => setIsTaskModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
