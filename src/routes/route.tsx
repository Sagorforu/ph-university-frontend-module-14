import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./route.admin";
import { RoutesGenerator } from "../utils/RoutesGenerator";
import { facultyPaths } from "./route.faculty";
import { studentPaths } from "./route.student";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: RoutesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: RoutesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: RoutesGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
