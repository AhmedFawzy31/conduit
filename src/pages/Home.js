import { useSelector } from "react-redux";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import TagList from "../components/TagList";
import ArticleList from "../components/ArticleList";
import { ClipLoader } from "react-spinners";
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  // to refetch on pagination and tag and user feed
  //https://github.com/TanStack/query/discussions/351
  const [queryParamaters, setParameters] = useState({
    offset: 0,
    tag: null,
    isFeed: user ? true : false,
  });
  //conditional auth if logged in
  let requestConfig = {};
  if (user)
    requestConfig = { headers: { Authorization: `Bearer ${user.token}` } };
  const [articles, tags] = useQueries({
    queries: [
      {
        queryKey: ["articles", queryParamaters],
        queryFn: async () => {
          const response = await axios.get(
            `https://api.realworld.io/api/articles${
              queryParamaters.isFeed ? "/feed" : ""
            }?offset=${queryParamaters.offset}${
              queryParamaters.tag ? "&tag=" + queryParamaters.tag : ""
            }`,
            requestConfig
          );
          return response.data;
        },
      },
      {
        queryKey: ["tags"],
        queryFn: async () => {
          const response = await axios.get(`https://api.realworld.io/api/tags`);
          return response.data;
        },
      },
    ],
  });
  const [activePage, setActivePage] = useState(0);
  //set pagination parameter of whatever we're getting, global or feed, with or without tag
  const handlePaginationClick = (offset) => {
    setActivePage(offset);
    setParameters({
      ...queryParamaters,
      offset: offset * 10,
    });
  };
  //get global feed not user feed, but with tag
  const handleTagFiter = (tag) => {
    setActivePage(0);
    setParameters({
      offset: 0,
      tag: tag,
      isFeed: false,
    });
  };
  //to get global feed without any filters when it's clicked
  const resetQuery = () => {
    setActivePage(0);
    setParameters({
      offset: 0,
      tag: null,
      isFeed: false,
    });
  };
  // get user feed
  const handleFeed = () => {
    setActivePage(0);
    setParameters({
      offset: 0,
      tag: null,
      isFeed: true,
    });
  };
  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {user && (
                    <li className="nav-item">
                      <button
                        onClick={handleFeed}
                        className={`nav-link ${
                          queryParamaters.isFeed ? "active" : ""
                        }`}
                      >
                        Your Feed
                      </button>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      onClick={resetQuery}
                      className={`nav-link ${
                        queryParamaters.isFeed || queryParamaters.tag
                          ? ""
                          : "active"
                      }`}
                    >
                      Global
                    </button>
                  </li>
                  {queryParamaters.tag && (
                    <li className={`nav-item`}>
                      <button className="nav-link active">{`#${queryParamaters.tag}`}</button>
                    </li>
                  )}
                </ul>
              </div>
              {articles.isLoading && (
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
              {articles.data && (
                <ArticleList
                  articles={articles.data}
                  handlePaginationClick={handlePaginationClick}
                  activePage={activePage}
                ></ArticleList>
              )}
            </div>

            <div className="col-md-3">
              <div
                style={{
                  position: "relative",
                  minHeight: "155px",
                }}
                className="sidebar d-flex flex-column justify-content-center align-items-center"
              >
                <p>Popular Tags</p>

                {tags.data && (
                  <TagList
                    tags={tags.data.tags}
                    handleTagFiter={handleTagFiter}
                  ></TagList>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
