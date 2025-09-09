import PrivateRoute from "@/ui/PrivateRoute";
import TasksPage from "@/routes/TasksPage";
import LoginPage from "@/routes/LoginPage";
import CreateAccountPage from "@/routes/CreateAccountPage";
import AppLayout from "@/ui/AppLayout";
import ForgotPasswordPage from "./routes/ForgotPasswordPage";
import ResetPasswordPage from "./routes/ResetPasswordPage";

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
      {
        path: "/esquecer-senha",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/resetar-senha",
        element: <ResetPasswordPage />,
      },
    ],
  },
];

export default routes;
