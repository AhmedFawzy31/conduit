//todo: spinner and error
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { login } from "../features/auth/authSlice";
const Settings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    image: user.image,
    username: user.username,
    bio: user.bio ? user.bio : "",
    email: user.email,
    password: "",
  });
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  const { isSuccess, mutate, data } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put(
        "https://api.realworld.io/api/user",
        data,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      return response.data;
    },
  });
  const handleUserUpdate = (e) => {
    e.preventDefault();
    const dataToSend = {};
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        dataToSend[key] = form[key];
      }
    });
    mutate({
      user: dataToSend,
    });
  };
  //https://stackoverflow.com/questions/70556785/warning-cannot-update-a-component-x-while-rendering-a-different-y-component-to
  useEffect(() => {
    if (isSuccess) {
      navigate(`/profile/${data.user.username}`);
      dispatch(login(data.user));
    }
  }, [dispatch, isSuccess, data, navigate]);
  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form onSubmit={handleUserUpdate}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      onChange={onChange}
                      value={form.image}
                      className="form-control"
                      type="text"
                      name="image"
                      placeholder="URL of profile picture"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      onChange={onChange}
                      value={form.username}
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      name="username"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      onChange={onChange}
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      name="bio"
                      value={form.bio}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      onChange={onChange}
                      value={form.email}
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      name="email"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      onChange={onChange}
                      value={form.password}
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button
                onClick={logoutHandler}
                className="btn btn-outline-danger"
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Settings;
