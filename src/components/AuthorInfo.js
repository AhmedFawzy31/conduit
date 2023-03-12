import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../helpers/convertData";

const AuthorInfo = ({ article }) => {
  return (
    <>
      <Link to={`/profile/${article.author.username}`}>
        <img alt="author" src={article.author.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>
    </>
  );
};

export default AuthorInfo;
