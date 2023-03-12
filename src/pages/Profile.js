import { useSelector } from "react-redux";
import { redirect, useParams } from "react-router-dom";
import { queryClient } from "../QueryClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import ArticleList from "../components/ArticleList";
const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { username } = useParams();
  const isOwnProfile = username === user.username;
  const profile = queryClient.getQueryData([username]);
  const profileData = {
    username: isOwnProfile ? user.username : profile.profile.username,
    image: isOwnProfile ? user.image : profile.profile.image,
    bio: isOwnProfile ? user.bio : profile.profile.bio,
  };
  let requestConfig = {};
  if (user)
    requestConfig = { headers: { Authorization: `Bearer ${user.token}` } };
  const [queryParamaters, setQueryParamaters] = useState({
    type: "author",
    offset: 0,
  });
  const profileArticles = useQuery({
    queryKey: [`${profileData.username}Articles`, queryParamaters],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.realworld.io/api/articles?${queryParamaters.type}=${profileData.username}&offset=${queryParamaters.offset}`,
        requestConfig
      );
      console.log(response.data);
      return response.data;
    },
  });
  const getAuthorArticles = () => {
    setQueryParamaters({
      type: "author",
      offset: 0,
    });
  };
  const getFavoritedArticles = () => {
    setQueryParamaters({
      type: "favorited",
      offset: 0,
    });
  };
  const handlePaginationClick = (offset) => {
    setQueryParamaters((prevState) => {
      return {
        ...prevState,
        offset: offset,
      };
    });
  };
  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              {(isOwnProfile || profile) && (
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img
                    src={profileData.image}
                    className="user-img"
                    alt="profile pic"
                  />
                  <h4>{profileData.username}</h4>
                  <p>{profileData.bio}</p>
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round"></i>
                    &nbsp; {`Follow ${profileData.username}`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <button
                      onClick={getAuthorArticles}
                      className={`nav-link ${
                        queryParamaters.type === "author" ? "active" : ""
                      }`}
                    >
                      My Articles
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={getFavoritedArticles}
                      className={`nav-link ${
                        queryParamaters.type === "favorited" ? "active" : ""
                      }`}
                    >
                      Favorited Articles
                    </button>
                  </li>
                </ul>
              </div>
              {profileArticles.data && (
                <ArticleList
                  handlePaginationClick={handlePaginationClick}
                  articles={profileArticles.data}
                ></ArticleList>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
export function loader({ request, params }) {
  const user = JSON.parse(localStorage.getItem("user"));
  //if not logged in route protection
  if (!user) return redirect("/auth/login");
  // don't waste time fetching if it's the profile of the logged in user
  if (params.username === user.username) return null;
  const url = `https://api.realworld.io/api/profiles/${params.username}`;
  const promise = queryClient.prefetchQuery({
    queryKey: [params.username],
    queryFn: async () => {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      console.log(response.data);
      return response.data;
    },
  });
  // return null if data already, don't refetch
  if (queryClient.getQueryData([params.username])) return null;
  //return promise if not
  return promise.then(() => {
    return queryClient.getQueryData([params.username]);
  });
}
