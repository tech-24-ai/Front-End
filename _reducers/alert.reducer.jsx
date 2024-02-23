import { alertConstants } from "../_constants";

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.INFO:
      return {
        type: "info",
        title: action.title,
        message: action.message,
      };
    case alertConstants.SUCCESS:
      return {
        type: "success",
        title: action.title,
        message: action.message,
      };
    case alertConstants.WARNING:
      return {
        type: "warning",
        title: action.title,
        message: action.message,
      };
    case alertConstants.ERROR:
      return {
        type: "danger",
        title: action.title,
        message: action.message,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
