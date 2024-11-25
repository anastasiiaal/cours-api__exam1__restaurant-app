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
      console.log(error);
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
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { accessToken } = await authService.register(email, password);
      await dispatch(registerSuccess({ accessToken }));
      store.dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };
