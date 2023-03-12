import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import { checkAuthLoader } from "./pages/Auth";
import Profile from "./pages/Profile";
import Article from "./pages/Article";
import Editor from "./pages/Editor";
import { loader as articleLoader } from "./pages/Article";
import { loader as profileLoader } from "./pages/Profile";
const router = createBrowserRouter([
  {
    path: "",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "auth/:mode",
        element: <Auth></Auth>,
      },
      {
        path: "settings",
        element: <Settings></Settings>,
        loader: checkAuthLoader,
      },
      {
        path: "profile/:username",
        element: <Profile></Profile>,
        loader: profileLoader,
      },
      {
        path: "article/:slug",
        element: <Article></Article>,
        loader: articleLoader,
      },
      {
        path: "editor",
        element: <Editor></Editor>,
      },
      {
        path: "editor/:slug",
        element: <Editor></Editor>,
        loader: () => {},
      },
    ],
  },
]);
export default router;
