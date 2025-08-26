
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, User } from "lucide-react";

export const ProjectsList = () => {
  // Mock project data
  const projects = [
    {
      id: 1,
      name: "Border Security Fence - Phase 1",
      location: "Northern Border",
      manager: "John Smith",
      progress: 100,
      status: "completed",
      startDate: "2024-01-15",
      endDate: "2024-05-20",
      totalFencing: "5.2 km",
      budget: "$2.5M"
    },
    {
      id: 2,
      name: "Military Base Perimeter",
      location: "Central Command",
      manager: "Sarah Johnson",
      progress: 75,
      status: "ongoing",
      startDate: "2024-03-01",
      endDate: "2024-08-15",
      totalFencing: "3.8 km",
      budget: "$1.8M"
    },
    {
      id: 3,
      name: "Airport Security Upgrade",
      location: "International Airport",
      manager: "Mike Davis",
      progress: 45,
      status: "ongoing",
      startDate: "2024-04-10",
      endDate: "2024-09-30",
      totalFencing: "2.1 km",
      budget: "$1.2M"
    },
    {
      id: 4,
      name: "Industrial Complex Fencing",
      location: "Industrial Zone",
      manager: "Emily Brown",
      progress: 30,
      status: "ongoing",
      startDate: "2024-05-01",
      endDate: "2024-10-15",
      totalFencing: "4.5 km",
      budget: "$2.1M"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "ongoing": return "bg-blue-100 text-blue-800";
      case "delayed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">12 Total Projects</Badge>
          <Badge className="bg-green-100 text-green-800">8 Completed</Badge>
          <Badge className="bg-blue-100 text-blue-800">4 Ongoing</Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {project.manager}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Total Fencing</div>
                  <div className="font-semibold">{project.totalFencing}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Budget</div>
                  <div className="font-semibold">{project.budget}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="font-semibold">{project.progress}%</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Project Completion</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
