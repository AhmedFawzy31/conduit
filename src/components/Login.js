import { Link } from "react-router-dom";
import { useState } from "react";
const Login = ({ authenticate }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    //why the extra () and []?
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    authenticate.mutate({ user: formState, action: "login" });
  };
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>

              {authenticate.isError && (
                <ul className="error-messages">
                  <li>Wrong email or password</li>
                </ul>
              )}

              <form onSubmit={onSubmit}>
                <fieldset className="form-group">
                  <input
                    value={formState.email}
                    onChange={onChange}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    disabled={authenticate.isLoading}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={formState.password}
                    onChange={onChange}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    disabled={authenticate.isLoading}
                  />
                </fieldset>
                <button
                  disabled={authenticate.isLoading}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
