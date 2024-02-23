import { loaderConstants } from '../_constants';

export const loaderActions = {
    show,
    custom_show,
    custom_hide,
    hide,
};

function show() {
    return { type: loaderConstants.SHOW };
}
function custom_show() {
    return { type: loaderConstants.SHOW_CUSTOM };
}
function custom_hide() {
    return { type: loaderConstants.HIDE_CUSTOM };
}
function hide() {
    return { type: loaderConstants.HIDE };
}
