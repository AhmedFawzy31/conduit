import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import { checkAuthLoader } from "./pages/Auth";
import Profile from "./pages/Profile";
import Article from "./pages/Article";
import NewArticle from "./pages/NewArticle";
import EditArticle from "./pages/EditArticle";
import { loader as articleLoader } from "./pages/Article";
import { loader as profileLoader } from "./pages/Profile";
import { loader as newArticleLoader } from "./pages/NewArticle";
import { loader as editArticleLoader } from "./pages/EditArticle";
const router = createHashRouter([
  {
    path: "/",
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
        element: <NewArticle></NewArticle>,
        loader: newArticleLoader,
      },
      {
        path: "editor/:slug",
        element: <EditArticle></EditArticle>,
        loader: editArticleLoader,
      },
    ],
  },
]);
export default router;
