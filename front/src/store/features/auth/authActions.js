import store from "../..";
import authService from "../../../api/AuthService";
import { loginSuccess, getUserSuccess, registerSuccess } from "./authSlice";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { accessToken } = await authService.login(email, password);
      await dispatch(loginSuccess({ accessToken }));
      store.dispatch(getUser());
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error?.response?.data?.message || "Invalid email or password");
    }
  };

export const getUser = () => async (dispatch) => {
  try {
    const user = await authService.getUser();
    dispatch(getUserSuccess({ user }));
  } catch (error) {
    console.log(error);
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const response = await authService.register(name, email, password);
      if (response?.accessToken) {
        dispatch(registerSuccess({ accessToken: response.accessToken }));
        store.dispatch(getUser());
      } else {
        console.error("Registration succeeded but no accessToken returned");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Registration failed. Please try again.");
    }
  };
