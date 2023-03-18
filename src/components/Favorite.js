import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { articleContext } from "../pages/Article";
const Favorite = ({ article }) => {
  const { articleState, setArticleState } = React.useContext(articleContext);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const favorite = async () => {
    const response = await axios.post(
      `https://api.realworld.io/api/articles/${article.slug}/favorite`,
      { data: {} },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.data) {
      setArticleState((prevState) => {
        return {
          ...prevState,
          favorited: !prevState.favorited,
          favoritesCount: response.data.article.favoritesCount,
        };
      });
    }
    return response.data;
  };
  const unfavorite = async () => {
    const response = await axios.delete(
      `https://api.realworld.io/api/articles/${article.slug}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.data) {
      setArticleState((prevState) => {
        return {
          ...prevState,
          favorited: !prevState.favorited,
          favoritesCount: response.data.article.favoritesCount,
        };
      });
    }
    return response.data;
  };
  const handleFavorite = useMutation({
    mutationFn: articleState.favorited ? unfavorite : favorite,
  });
  const handleFavoriteClick = () => {
    //should it be returned?
    if (!user) return navigate("/auth/login");
    handleFavorite.mutate();
  };
  const fullStyles = {
    marginLeft: "10px",
    opacity: handleFavorite.isLoading ? "0.5" : "0.8",
    backgroundColor: articleState.favorited ? "#5cb85c" : "transparent",
    color: articleState.favorited ? "#fff" : "#5cb85c",
    outline: "0",
  };
  return (
    <button
      onClick={handleFavoriteClick}
      disabled={handleFavorite.isLoading}
      style={fullStyles}
      className="btn btn-sm btn-outline-primary"
    >
      <i className="ion-heart"></i>
      &nbsp; {articleState.favorited ? "Unfavorite post" : "Favorite post"}
      <span className="counter">{`(${articleState.favoritesCount})`}</span>
    </button>
  );
};

export default Favorite;
