import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comment from "./Comment";
import { useSelector } from "react-redux";

const Comments = ({ slug }) => {
  const { user } = useSelector((state) => state.auth);
  let config = {};
  if (user) {
    config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  const comments = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.realworld.io/api/articles/${slug}/comments`,
        config
      );
      console.log(response.data);
      return response.data;
    },
  });
  return (
    <>
      {comments.isLoading && <div>Loading comments...</div>}
      {comments.data &&
        comments.data.comments.map((comment) => {
          return (
            <Comment slug={slug} key={comment.id} comment={comment}></Comment>
          );
        })}
    </>
  );
};

export default Comments;
