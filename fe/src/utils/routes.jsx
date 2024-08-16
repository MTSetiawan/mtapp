import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import ErrorPage from "../pages/error";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import {
  dashboardAction,
  loginAction,
  registerAction,
} from "../action/userAction";
import DashboardPage from "../pages/dashboard/dashboardPage";
import ProfilePage from "../pages/profile/profilePage";
import { potoProfileAction } from "../action/profileAction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
    loader: dashboardAction,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
    action: potoProfileAction,
  },
]);
