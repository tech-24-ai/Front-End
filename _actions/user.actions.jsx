import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers";
import { loaderActions } from "./loader.actions";
const redirect = (url) => {
  userService.redirect(`/${url}`);
  return { type: userConstants.LOGOUT };
};

export const userActions = {
  login,
  logout,
  register,
  linkedInLogin,
  redirect,
  guest,
  toggleLoginPopup,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));
    dispatch(loaderActions.show());
    userService.login(username, password).then((user) => {
      dispatch(loaderActions.hide());
      if (user) {
        dispatch(success(user.data));
      }
    });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function guest() {
  return (dispatch) => {
    // dispatch(request());

    userService.guest().then((user) => {
      if (user) {
        dispatch(success(user.data));
      }
    });
  };

  // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) {
    return { type: userConstants.GUEST_SESSION, user };
  }
  function failure(error) {
    return { type: userConstants.GUEST_SESSION_FAILURE, error };
  }
}

function linkedInLogin(code) {
  return (dispatch) => {
    dispatch(request({ code }));

    userService.linkedInLogin(code).then((user) => {
      if (user) {
        dispatch(success(user.data));
      }
    });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then((user) => {
      if (user) {
        dispatch(success(user.message));
        history.push("/");
        dispatch(alertActions.success("Registration successful"));
      }
    });
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function toggleLoginPopup(
  toggle,
  message = { message: null, BtnText: null, isVideo: false, videoLink: null }
) {
  return {
    type: userConstants.TOGGLE_LOGIN_POPUP,
    toggle: toggle,
    data: message,
  };
}
