import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);
  const [shown, setIsShown] = useState(false);
  const toggle = () => {
    setIsShown((prevState) => !prevState);
  };
  //close nav when route changes
  const location = useLocation();
  useEffect(() => {
    setIsShown(false);
  }, [location]);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <div className="mobileNavContainer">
          <NavLink className="navbar-brand" to="/">
            conduit
          </NavLink>
          <button className="toggleButton btn btn-primary" onClick={toggle}>
            <i className="ion-navicon-round"></i>
          </button>
        </div>

        <ul className="lgNav nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/editor">
                <i className="ion-compose"></i>&nbsp;New Article{" "}
              </NavLink>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link">
                {" "}
                <i className="ion-gear-a"></i>&nbsp;Settings{" "}
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/auth/login">
                Sign in
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/auth/register">
                Sign up
              </NavLink>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <NavLink
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className="nav-link"
                to={`/profile/${user.username}`}
              >
                <img
                  className="user-pic"
                  alt="User Avatar"
                  src={user.image}
                ></img>
                <span
                  style={{
                    color: "black",
                  }}
                >
                  {user.username}
                </span>
              </NavLink>
            </li>
          )}
        </ul>
        {shown && (
          <ul
            style={{
              width: "100%",

              flexDirection: "column",
            }}
            className="toggle nav navbar-nav"
          >
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/editor">
                  <i className="ion-compose"></i>&nbsp;New Article{" "}
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/auth/login">
                  Sign in
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/auth/register">
                  Sign up
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <NavLink
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="nav-link"
                  to={`/profile/${user.username}`}
                >
                  <img
                    className="user-pic"
                    alt="User Avatar"
                    src={user.image}
                  ></img>
                  <span
                    style={{
                      color: "black",
                    }}
                  >
                    {user.username}
                  </span>
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};
export default Navigation;
