import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { articleContext } from "../pages/Article";
import { useContext } from "react";
const Follow = ({ profileData }) => {
  const { user } = useSelector((state) => state.auth);
  const { articleState, setArticleState } = useContext(articleContext);
  const apiUrl = `https://api.realworld.io/api/profiles/${profileData.username}/follow`;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const followAction = useMutation({
    mutationFn: async () => {
      let response;
      if (articleState.following) {
        response = await axios.delete(apiUrl, config);
      } else response = await axios.post(apiUrl, {}, config);
      console.log(response);
      if (response.data) {
        setArticleState((prevState) => {
          return {
            ...prevState,
            following: !prevState.following,
          };
        });
      }
    },
  });
  const handleFollowAction = () => {
    followAction.mutate();
  };
  return (
    <button
      disabled={followAction.isLoading}
      onClick={handleFollowAction}
      className="btn btn-sm btn-outline-secondary action-btn"
    >
      <i className="ion-plus-round"></i>
      &nbsp;{" "}
      {`${articleState.following ? "Unfollow" : "follow"} ${
        profileData.username
      }`}
    </button>
  );
};

export default Follow;
