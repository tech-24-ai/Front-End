import axios from "axios";
import { authHeader, apiUrl, store } from "../_helpers";
import { alertActions, userActions, loaderActions } from "../_actions";

let url = process.env.NEXT_PUBLIC_API_BASE_URL;
let instance = axios.create({
  // baseURL: apiUrl(),
  baseURL: url,
  headers: authHeader(),
});

const { dispatch } = store;
const successHandler = (response) => {
  if (response.status === 200) {
    // if (response.data && response.data.message) {
    //     dispatch(alertActions.success(response.data.message))
    // }
  }
  dispatch(loaderActions.hide());
  return response;
};

const errorHandler = async (error) => {
  const { response } = error;
  if (response) {
    switch (response.status) {
      case 422:
        dispatch(
          alertActions.error(response.data[0].message, response.statusText)
        );
        break;
      case 423:
        let errorMessage = response.data.message;
        if (error.response.data instanceof Blob) {
          const blob = new Blob([response.data]);
          errorMessage = await blob.text();
        }
        dispatch(alertActions.error(errorMessage, response.statusText));
        break;
      case 403:
        dispatch(alertActions.error(response.data.message, "Access Denied"));
        break;
      case 300:
        // dispatch(userActions.toggleLoginPopup(true));
        break;
      case 404:
        console.log("ErrCong", response);
        dispatch(alertActions.error(response.data.message));
        break;
      case 401:
        const token = localStorage.getItem("tech24Token");
        if (!token && window.location.pathname === "/login") {
          dispatch(alertActions.warning(response.data.message));
        } else if (
          !token &&
          window.location.pathname === "/troubleshoot-subject"
        ) {
          dispatch(
            alertActions.warning("To Access this feature, please login")
          );
          setTimeout(() => {
            dispatch(userActions.logout());
          }, 1000);
        } else {
          // dispatch(
          //   userActions.toggleLoginPopup(true, {
          //     message: "Session expired! Please login to continue",
          //     BtnText: null,
          //   })
          // );
          dispatch(
            alertActions.warning("Session expired! Please login to continue")
          );
          setTimeout(() => {
            dispatch(userActions.logout());
          }, 1000);
        }
        break;
      case 500:
      // dispatch(userActions.redirect('login'))
      default:
        //dispatch(alertActions.error(response.data.message));
        break;
    }
  }

  dispatch(loaderActions.hide());
  return error;
};

instance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export const apiConfig = instance;
