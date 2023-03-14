import AuthorInfo from "./AuthorInfo";
import { useSelector } from "react-redux";
import Favorite from "./Favorite";
import FollowArticle from "./FollowArticle";

const ArticleMeta = ({ article }) => {
  const { user } = useSelector((state) => state.auth);
  let isAuthor = false;
  if (user && article.author.username === user.username) isAuthor = true;
  const conditionalContent = isAuthor ? (
    <>
      <button className="btn btn-sm btn-outline-secondary" type="button">
        <i className="ion-edit"></i> Edit Article
      </button>{" "}
      <button className="btn btn-sm btn-outline-danger" type="button">
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </>
  ) : (
    <>
      <FollowArticle profileData={article.author}></FollowArticle>
      <Favorite article={article} type="fullArticle"></Favorite>
    </>
  );
  return (
    <div className="article-meta">
      <AuthorInfo article={article}></AuthorInfo>
      {conditionalContent}
    </div>
  );
};

export default ArticleMeta;
