import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

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
        `${process.env.REACT_APP_API_URL}/api/articles/${slug}/comments`,
        config
      );
      return response.data;
    },
  });
  return (
    <>
      {comments.isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <ClipLoader
            speedMultiplier={2}
            color="#5cb85c"
            size={40}
          ></ClipLoader>
        </div>
      )}
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
