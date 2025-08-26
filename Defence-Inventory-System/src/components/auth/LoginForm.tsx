
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Shield } from "lucide-react";
import { UserRole } from "@/pages/Index";

interface LoginFormProps {
  onLogin: (role: UserRole, name: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [adminForm, setAdminForm] = useState({ username: "", password: "" });
  const [agencyForm, setAgencyForm] = useState({ agencyName: "", email: "", password: "" });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminForm.username && adminForm.password) {
      onLogin("admin", adminForm.username);
    }
  };

  const handleAgencyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (agencyForm.agencyName && agencyForm.email && agencyForm.password) {
      onLogin("agency", agencyForm.agencyName);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-blue-800 mb-2">
            <Building2 className="h-8 w-8" />
            ADRDE Inventory
          </div>
          <p className="text-gray-600">Defence Management System</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="agency" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="agency" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Agency
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="agency" className="mt-6">
                <form onSubmit={handleAgencyLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="agencyName">Agency Name</Label>
                    <Input
                      id="agencyName"
                      type="text"
                      placeholder="Enter your agency name"
                      value={agencyForm.agencyName}
                      onChange={(e) => setAgencyForm({ ...agencyForm, agencyName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={agencyForm.email}
                      onChange={(e) => setAgencyForm({ ...agencyForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="agencyPassword">Password</Label>
                    <Input
                      id="agencyPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={agencyForm.password}
                      onChange={(e) => setAgencyForm({ ...agencyForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Login as Agency
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter admin username"
                      value={adminForm.username}
                      onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Login as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
