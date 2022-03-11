import Login from "../../modules/auth/pages/Login";
import Register from "../../modules/auth/pages/Register";

const AuthRouter = [
  {
    path: "/login",
    label: "Login",
    component: Login,
  },
  {
    path: "/register",
    label: "Register",
    component: Register,
  },
];

export default AuthRouter;
