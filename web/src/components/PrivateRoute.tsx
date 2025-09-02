import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth";
import Loader from "@/components/Loader";
import { LogoutButton } from "../components/LogoutButton";

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, fetchCurrentUser } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      fetchCurrentUser()
        .catch(() => {
          navigate("/login", { replace: true });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <nav className="w-full h-12 border-b border-neutral-300 bg-white flex justify-between px-6 items-center">
        <h1 className="text-center font-bold text-xl">Task Master</h1>
        <LogoutButton />
      </nav>
      {children}
    </>
  );
}

export default PrivateRoute;
