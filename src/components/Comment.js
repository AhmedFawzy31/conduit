import { Link } from "react-router-dom";
import formatDate from "../helpers/convertData";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { queryClient } from "../QueryClient";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Comment = ({ comment, slug }) => {
  const { user } = useSelector((state) => state.auth);
  let isAuthor = false;
  if (user && comment.author.username === user.username) isAuthor = true;
  const { isSuccess, mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `https://conduit-api-ityi.onrender.com/api/articles/${slug}/comments/${comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data) return response.data;
    },
  });
  const handleCommentDelete = (e) => {
    e.preventDefault();
    mutate();
  };
  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries({ queryKey: ["comments"] });
  }, [isSuccess]);
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          <img
            alt="comment author"
            src={comment.author.image}
            className="comment-author-img"
          />
        </Link>
        &nbsp;
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{formatDate(comment.createdAt)}</span>
        {isAuthor && (
          <span onClick={handleCommentDelete} className="mod-options">
            {!isLoading && <i className="ion-trash-a"></i>}
            {isLoading && <ClipLoader size={20} color={"#b85c5c"}></ClipLoader>}
          </span>
        )}
      </div>
    </div>
  );
};

export default Comment;
