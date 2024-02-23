import { cookiesConstants } from "../_constants";

export const cookiesActions = {
  show,
  hide,
};

function show() {
  return { type: cookiesConstants.SHOW };
}
function hide() {
  return { type: cookiesConstants.HIDE };
}
