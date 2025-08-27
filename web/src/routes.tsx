import AppLayout from "./ui/AppLayout";
import TasksPage from "@/routes/tasksPage";
import LoginPage from "@/routes/loginPage";

export default [
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <TasksPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];
