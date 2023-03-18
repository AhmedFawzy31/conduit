import { Link } from "react-router-dom";
import { useState } from "react";
const Register = ({ authenticate }) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    //why the extra ()?
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    authenticate.mutate({ user: formState, action: "register" });
  };
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              {authenticate.isError && (
                <ul className="error-messages">
                  <li>That email or username is already taken</li>
                </ul>
              )}

              <form onSubmit={onSubmit}>
                <fieldset className="form-group">
                  <input
                    value={formState.username}
                    onChange={onChange}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    disabled={authenticate.isLoading}
                  />
                </fieldset>
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
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
