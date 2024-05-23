import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import AddArticles from "../pages/addArticles/AddArticles";
import AllArticles from "../pages/allArticles/AllArticles";
import ArticlesDetails from "../pages/articlesDetails/ArticlesDetails";
import Subscription from "../pages/subscription/Subscription";
import PremiumArticles from "../pages/premiumArticles/PremiumArticles";
import MyArticles from "../pages/myArticles/MyArticles";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AllUsers from "../pages/dashboard/allUsers/AllUsers";
import AddPublisher from "../pages/dashboard/addPublisher/AddPublisher";
import Payment from "../pages/payment/Payment";
import PrivateRoute from "../pages/private/PrivateRoute";
import AdminRoute from "../pages/private/AdminRoute";
import AdminAllArticle from "../pages/dashboard/allArticles/AdminAllArticle";
import ErrorPage from "../pages/errorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-Articles",
        element: (
          <PrivateRoute>
            <AddArticles></AddArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-articles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/articles-Details/:id",
        element: (
          <PrivateRoute>
            <ArticlesDetails></ArticlesDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>
          </PrivateRoute>
        ),
      },
      {
        path: "/premium-Articles",
        element: <PremiumArticles></PremiumArticles>,
      },
      {
        path: "/my-Articles",
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Dashboard></Dashboard>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-publisher",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddPublisher></AddPublisher>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-article",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminAllArticle></AdminAllArticle>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
