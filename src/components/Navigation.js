import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Navigation = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/">
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
      </div>
    </nav>
  );
};
export default Navigation;
