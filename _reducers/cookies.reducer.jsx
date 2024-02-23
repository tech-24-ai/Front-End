import { cookiesConstants } from "../_constants";

export function cookies(state = { isVisible: true }, action) {
  switch (action.type) {
    case cookiesConstants.SHOW:
      return {
        type: "show",
        isVisible: true,
      };
    case cookiesConstants.HIDE:
      return {
        type: "hide",
        isVisible: false,
      };
    default:
      return state;
  }
}
