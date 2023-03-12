import React, { useState } from "react";
import { queryClient } from "../QueryClient";
import axios from "axios";
import { useParams } from "react-router-dom";
import TagList from "../components/TagList";
import ArticleMeta from "../components/ArticleMeta";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import NewComment from "../components/NewComment";
export const articleContext = React.createContext();
const Article = () => {
  const user = useSelector((state) => state.auth.user);
  const { slug } = useParams();
  const articleData = queryClient.getQueryData([slug]);
  const article = articleData.article;
  const [articleState, setArticleState] = useState({
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
  });
  return (
    <articleContext.Provider value={{ articleState, setArticleState }}>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>

            <ArticleMeta article={article}></ArticleMeta>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article.body}</p>
            </div>
          </div>
          <TagList tags={article.tagList}></TagList>
          <hr />

          <div className="article-actions">
            <ArticleMeta article={article}></ArticleMeta>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {user && <NewComment user={user}></NewComment>}
              <Comments slug={slug}></Comments>
            </div>
          </div>
        </div>
      </div>
    </articleContext.Provider>
  );
};
export default Article;
export function loader({ request, params }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const url = `https://api.realworld.io/api/articles/${params.slug}`;
  const promise = queryClient.prefetchQuery({
    queryKey: [params.slug],
    queryFn: async () => {
      //auth to get favorited boolean
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  // return null if data already cached, don't refetch
  if (queryClient.getQueryData([params.slug])) return null;
  //return promise if not
  return promise.then(() => {
    return queryClient.getQueryData([params.slug]);
  });
}
