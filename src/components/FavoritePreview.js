import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../QueryClient";
const Favorite = ({ type, article }) => {
  const [previewState, setPreviewState] = useState({
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
  });
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const favorite = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/articles/${article.slug}/favorite`,
      { data: {} },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.data) {
      setPreviewState((prevState) => {
        return {
          favorited: !prevState.favorited,
          favoritesCount: response.data.article.favoritesCount,
        };
      });
      return response.data;
    }
  };
  const unfavorite = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/articles/${article.slug}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.data) {
      setPreviewState((prevState) => {
        return {
          favorited: !prevState.favorited,
          favoritesCount: response.data.article.favoritesCount,
        };
      });
    }
    return response.data;
  };
  const handleFavorite = useMutation({
    mutationFn: previewState.favorited ? unfavorite : favorite,
  });
  //refetch, useful when in profile and user unfavorites
  useEffect(() => {
    if (user) {
      if (handleFavorite.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [`${user.username}Articles`],
        });
    }
  }, [handleFavorite.isSuccess, user]);
  const handleFavoriteClick = () => {
    //should it be returned?
    if (!user) return navigate("/auth/login");
    handleFavorite.mutate();
  };
  const previewStyles = {
    opacity: handleFavorite.isLoading ? "0.7" : "1",
    backgroundColor: previewState.favorited ? "#5cb85c" : "#fff",
    color: previewState.favorited ? "#fff" : "#5cb85c",
    outline: "0",
  };
  return (
    <button
      style={previewStyles}
      disabled={handleFavorite.isLoading}
      onClick={handleFavoriteClick}
      className="btn btn-outline-primary btn-sm pull-xs-right"
    >
      <i className="ion-heart"></i> {previewState.favoritesCount}
    </button>
  );
};

export default Favorite;
