import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import ErrorPage from "../pages/error";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import { loginAction, registerAction } from "../action/userAction";
import DashboardPage from "../pages/dashboard/dashboardPage";
import ProfilePage from "../pages/profile/profilePage";
import {
  getAllPostAction,
  getDetailPostsAction,
} from "../action/userPostsAction";
import MessagePage from "../pages/message";
import UserSearch from "../pages/search";
import DetailPost from "../pages/posts/detailPost";
import MessageList from "../pages/message/messageList";

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
    loader: getAllPostAction,
  },
  {
    path: "/posts/:postId",
    element: <DetailPost />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => {
      const { postId } = params;
      const postDetail = await getDetailPostsAction(postId);
      return postDetail;
    },
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
    path: "/profile/:userId",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <UserSearch />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/message",
    element: <MessageList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/message/:receiverId",
    element: <MessagePage />,
    errorElement: <ErrorPage />,
  },
]);
