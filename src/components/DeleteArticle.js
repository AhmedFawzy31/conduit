import React, { useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteArticle = ({ slug }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, mutate } = useMutation({
    mutationFn: async () => {
      const response = axios.delete(
        `https://api.realworld.io/api/articles/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data) return response.data;
    },
  });
  const handleDeleteArticle = () => {
    mutate();
  };
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);
  return (
    <button
      onClick={handleDeleteArticle}
      className="btn btn-sm btn-outline-danger"
      type="button"
      disabled={isLoading}
    >
      <i className="ion-trash-a"></i> Delete Article
    </button>
  );
};

export default DeleteArticle;
