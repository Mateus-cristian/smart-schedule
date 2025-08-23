import AppLayout from "./ui/AppLayout";
import TasksPage from "@/routes/tasksPage";

export default [
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <TasksPage />,
      },
    ],
  },
];
