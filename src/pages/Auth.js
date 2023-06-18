import axios from "axios";
import { redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = `${process.env.REACT_APP_API_URL}/api/users`;
  const authenticate = useMutation({
    mutationFn: async ({ user, action }) => {
      const isRegister = action === "register";
      let userData;
      if (isRegister) {
        userData = {
          user: {
            username: user.username,
            email: user.email,
            password: user.password,
          },
        };
      } else {
        userData = {
          user: {
            email: user.email,
            password: user.password,
          },
        };
      }
      const response = await axios.post(
        API_URL + (isRegister ? "" : "/login"),
        userData
      );
      if (response.data) {
        dispatch(login(response.data.user));
        navigate("/");
      }
      console.log(response);
      return response.data;
    },
  });
  const { mode } = useParams();
  return mode === "login" ? (
    <Login authenticate={authenticate}></Login>
  ) : (
    <Register authenticate={authenticate}></Register>
  );
};

export default Auth;
export const checkAuthLoader = () => {
  if (!localStorage.getItem("user")) return redirect("/auth/login");
  return null;
};
