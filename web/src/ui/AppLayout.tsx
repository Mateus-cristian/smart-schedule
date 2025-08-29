import { Outlet } from "react-router";
import { type JSX } from "react";
import GlobalLoader from "@/components/GlobalLoader";
import { Toaster } from "react-hot-toast";

function AppLayout(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalLoader />
      <Toaster />
      <Outlet />
    </div>
  );
}

export default AppLayout;
