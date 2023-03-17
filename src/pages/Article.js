import React, { useState } from "react";
import { queryClient } from "../QueryClient";
import axios from "axios";
import { useParams } from "react-router-dom";
import TagList from "../components/TagList";
import ArticleMeta from "../components/ArticleMeta";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import NewComment from "../components/NewComment";
import { useLoaderData } from "react-router-dom";
export const articleContext = React.createContext();
const Article = () => {
  const user = useSelector((state) => state.auth.user);
  const { slug } = useParams();
  //get article from loader data
  const { article } = useLoaderData();
  const [articleState, setArticleState] = useState({
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
    following: article.author.following,
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
              {user && (
                <NewComment slug={article.slug} user={user}></NewComment>
              )}
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
      // auth to get favorited boolean
      let config = {};
      if (user) {
        config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
      }
      const response = await axios.get(url, config);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return promise.then(() => {
    return queryClient.getQueryData([params.slug]);
  });
}
