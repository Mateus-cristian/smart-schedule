import PrivateRoute from "@/ui/PrivateRoute";
import TasksPage from "@/routes/TasksPage";
import LoginPage from "@/routes/LoginPage";
import CreateAccountPage from "@/routes/CreateAccountPage";
import AppLayout from "@/ui/AppLayout";

const routes = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/tasks",
        element: (
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        ),
      },
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/criar-conta",
        element: <CreateAccountPage />,
      },
    ],
  },
];

export default routes;
