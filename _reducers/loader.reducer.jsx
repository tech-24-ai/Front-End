import { loaderConstants } from '../_constants';

export function loader(state = {loader:false,customLoader:false}, action) {
    switch (action.type) {
        case loaderConstants.SHOW:
            return {...state,loader:true}
        case loaderConstants.SHOW_CUSTOM:
            return {...state,customLoader:true}
        case loaderConstants.HIDE:
            return {...state,loader:false}
        case loaderConstants.HIDE_CUSTOM:
            return {...state,customLoader:false}
        default:
            return state
    }
}