import { Outlet } from "react-router";
import { type JSX } from "react";

function AppLayout(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}

export default AppLayout;
