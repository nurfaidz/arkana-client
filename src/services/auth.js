import router from "../router";
import Cookies from "js-cookie";

const AuthService = {
  logout: async () => {
    Cookies.remove("token");
    Cookies.remove("user");

    await router.replace({
      name: "login",
    });

    return { success: true, message: "Logged out successfully" };
  },
};

export default AuthService;
