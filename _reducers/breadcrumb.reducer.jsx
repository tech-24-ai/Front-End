import { breadcrumbConstants } from '../_constants';

export function breadcrumb(state = [], action) {
    switch (action.type) {
        case breadcrumbConstants.ADD:
            return [...state, action.data]
        case breadcrumbConstants.CLEAR:
            return [];
        default:
            return state
    }
}