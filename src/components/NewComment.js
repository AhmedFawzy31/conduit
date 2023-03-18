import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { queryClient } from "../QueryClient";
const NewComment = ({ user, slug }) => {
  const [commentText, setCommentText] = useState("");
  const { isSuccess, mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://api.realworld.io/api/articles/${slug}/comments`,
        {
          comment: {
            body: commentText,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data) return response.data;
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };
  //refetch
  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries({ queryKey: ["comments"] });
  }, [isSuccess]);
  return (
    <form onSubmit={handleFormSubmit} className="card comment-form">
      <div className="card-block">
        <textarea
          required
          disabled={isLoading}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          className="form-control"
          placeholder="Write a comment..."
          value={commentText}
          rows="3"
        ></textarea>
      </div>
      <div className="card-footer">
        <img src={user.image} className="comment-author-img" alt="you" />
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-sm btn-primary"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default NewComment;
