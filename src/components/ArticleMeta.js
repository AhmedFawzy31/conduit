import AuthorInfo from "./AuthorInfo";
import { useSelector } from "react-redux";
import Favorite from "./Favorite";
import FollowArticle from "./FollowArticle";
import DeleteArticle from "./DeleteArticle";
import { Link } from "react-router-dom";

const ArticleMeta = ({ article }) => {
  const { user } = useSelector((state) => state.auth);
  let isAuthor = false;
  if (user && article.author.username === user.username) isAuthor = true;
  const conditionalContent = isAuthor ? (
    <>
      <Link
        to={`/editor/${article.slug}`}
        state={article}
        className="btn btn-sm btn-outline-secondary"
        type="button"
      >
        <i className="ion-edit"></i> Edit Article
      </Link>{" "}
      <DeleteArticle slug={article.slug}></DeleteArticle>
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
