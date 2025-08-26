
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { UserDashboard } from "@/components/user/UserDashboard";

export type UserRole = "admin" | "agency" | null;

const Index = () => {
  const [user, setUser] = useState<{ role: UserRole; name: string } | null>(null);

  const handleLogin = (role: UserRole, name: string) => {
    setUser({ role, name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === "admin" ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <UserDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
