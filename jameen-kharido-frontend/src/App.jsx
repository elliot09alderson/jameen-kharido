import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./pages/components/Footer.jsx";
import Home from "./pages/HOME/Home.jsx";
import NotFound from "./pages/components/NotFound.jsx";
import Ads from "./pages/ADS/Ads.jsx";
import "./App.css";
import ViewDetails from "./pages/ADS/ViewDetails.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import PublicRoute from "./Routes/PublicRoute.jsx";
import { Slide } from "react-toastify";
import PostHome from "./pages/POST/HOME/PostHome.jsx";
import PostFlat from "./pages/POST/FLAT/PostFlat.jsx";
import POST from "./pages/POST/POST.jsx";
import PostShop from "./pages/POST/SHOP/PostShop.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    ,
    {
      path: "/ads/:catname",
      element: <Ads />,
    },
    {
      path: "/ad/detail",
      element: <ViewDetails />,
    },
    {
      path: "/post",

      children: [
        {
          index: true, // Renders this when only /post is visited
          element: <POST />,
        },
        {
          path: "flat",
          element: <PostFlat />,
        },
        {
          path: "home",
          element: <PostHome />,
        },
        {
          path: "shop",
          element: <PostShop />,
        },
      ],
    },
    {
      path: "/",
      element: <PublicRoute />, // Public routes wrapper
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />

      <Footer />
    </div>
  );
};

export default App;
