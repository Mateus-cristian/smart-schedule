import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router";

export function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return <button onClick={handleLogout}>Sair</button>;
}
