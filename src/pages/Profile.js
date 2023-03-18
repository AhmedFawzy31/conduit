import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { queryClient } from "../QueryClient";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ArticleList from "../components/ArticleList";
import Follow from "../components/Follow";
import { useLoaderData } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { username } = useParams();
  let isOwnProfile = false;
  if (user) isOwnProfile = username === user.username;
  const profile = useLoaderData();
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
      return response.data;
    },
  });
  //reset when new profile is loaded, but only if it's another profile than the current one
  useEffect(() => {
    setActivePage(0);
    setQueryParamaters({
      type: "author",
      offset: 0,
    });
  }, [profileData.username]);
  const getAuthorArticles = () => {
    setActivePage(0);
    setQueryParamaters({
      type: "author",
      offset: 0,
    });
  };
  const getFavoritedArticles = () => {
    setActivePage(0);
    setQueryParamaters({
      type: "favorited",
      offset: 0,
    });
  };
  const [activePage, setActivePage] = useState(0);
  const handlePaginationClick = (offset) => {
    setActivePage(offset);
    setQueryParamaters((prevState) => {
      return {
        ...prevState,
        offset: offset * 10,
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
                  {!isOwnProfile && (
                    <Follow profileData={profile.profile}></Follow>
                  )}
                  {isOwnProfile && (
                    <Link
                      to={"/settings"}
                      className="btn btn-sm btn-outline-secondary action-btn"
                    >
                      <i className="ion-gear-a"></i> Edit profile settings
                    </Link>
                  )}
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
              {profileArticles.isLoading && (
                <ClipLoader
                  speedMultiplier={2}
                  color="#5cb85c"
                  size={60}
                  cssOverride={{
                    display: "block",
                    margin: "auto",
                    position: "relative",
                    top: "100px",
                  }}
                ></ClipLoader>
              )}
              {profileArticles.data && (
                <ArticleList
                  handlePaginationClick={handlePaginationClick}
                  articles={profileArticles.data}
                  activePage={activePage}
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

  // don't waste time fetching if it's the profile of the logged in user
  if (user) {
    if (params.username === user.username) return null;
  }
  const url = `https://api.realworld.io/api/profiles/${params.username}`;
  let config = {};
  if (user) {
    config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  const promise = queryClient.prefetchQuery({
    queryKey: [params.username],
    queryFn: async () => {
      const response = await axios.get(url, config);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return promise.then(() => {
    return queryClient.getQueryData([params.username]);
  });
}
