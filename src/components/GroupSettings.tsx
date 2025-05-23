
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Trophy, Bell, Palette, LogOut, Crown, Star } from "lucide-react";

export const GroupSettings = () => {
  const groupMembers = [
    { id: "alex", name: "Alex Johnson", role: "Admin", points: 127, avatar: "AJ", isMe: true },
    { id: "sarah", name: "Sarah Chen", role: "Member", points: 89, avatar: "SC", isMe: false },
    { id: "mike", name: "Mike Rodriguez", role: "Member", points: 102, avatar: "MR", isMe: false },
    { id: "emma", name: "Emma Davis", role: "Member", points: 76, avatar: "ED", isMe: false },
  ];

  const sortedMembers = groupMembers.sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-900">Group Settings</h1>
      </div>

      {/* Group Info */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Team Alpha</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">A productive team working on exciting projects together.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{groupMembers.length}</p>
              <p className="text-sm text-blue-700">Members</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {groupMembers.reduce((sum, member) => sum + member.points, 0)}
              </p>
              <p className="text-sm text-green-700">Total Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span>Leaderboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedMembers.map((member, index) => (
              <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <Crown className="absolute -top-1 -right-1 w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      {member.isMe && <Badge variant="secondary" className="text-xs">You</Badge>}
                    </div>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-amber-600">{member.points}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Options */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Palette className="w-5 h-5 mr-3" />
            Theme
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="w-5 h-5 mr-3" />
            Invite Members
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-0 shadow-sm border-red-100">
        <CardContent className="pt-6">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-5 h-5 mr-3" />
            Leave Group
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
