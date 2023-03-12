import { Link } from "react-router-dom";
import formatDate from "../helpers/convertData";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const { user } = useSelector((state) => state.auth);
  let isAuthor = false;
  if (user && comment.author.username === user.username) isAuthor = true;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to="" className="comment-author">
          <img
            alt="comment author"
            src={comment.author.image}
            className="comment-author-img"
          />
        </Link>
        &nbsp;
        <Link to="" className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">{formatDate(comment.createdAt)}</span>
        {isAuthor && (
          <span className="mod-options">
            <i class="ion-trash-a"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default Comment;
