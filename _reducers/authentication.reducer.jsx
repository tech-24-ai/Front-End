import { userConstants } from "../_constants";
let token;
if (process.browser) {
  token = localStorage.getItem("tech24Token");
}

// const initialState = token ? { loggedIn: true } : { loggedIn: false };
const initialState = {
  loggedIn: token ? true : false,
  showLoginPopup: false,
  popupMsg: { message: null, BtnText: null },
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { ...state, loggedIn: false, user: action.user };
    case userConstants.LOGIN_SUCCESS:
      return { ...state, loggedIn: true, user: action.user };
    case userConstants.GUEST_SESSION:
      return { ...state, user: action.user };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return { ...state, loggedIn: false };
    case userConstants.TOGGLE_LOGIN_POPUP:
      return {
        ...state,
        showLoginPopup: action.toggle,
        popupMsg: action.data,
      };
    default:
      return state;
  }
}
