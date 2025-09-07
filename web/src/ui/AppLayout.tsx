import { Outlet } from "react-router";
import { type JSX } from "react";
import Loader from "@/components/Loader";
import { Toaster } from "react-hot-toast";

function AppLayout(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Loader />
      <Toaster />
      <Outlet />
    </div>
  );
}

export default AppLayout;
