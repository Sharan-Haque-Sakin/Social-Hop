import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login";
import Cookies from "universal-cookie";

const hasToken = () => {
  let token = true;
  const cookies = new Cookies();
  cookies.get("authCookie") ? (token = true) : (token = false);

  return token;
};

const ProtectedRoute = () => {
  return hasToken() ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" /> <Login />
    </>
  );
  // return console.log(hasToken());
};

export default ProtectedRoute;
