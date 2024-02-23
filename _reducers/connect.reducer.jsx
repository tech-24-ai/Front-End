import { connectConstants } from '../_constants';

export function connectData(state = [], action) {
    switch (action.type) {
        case connectConstants.ADD:
            // return [...state, action.data]
            return action.data
        case connectConstants.CLEAR:
            return [];
        default:
            return state
    }
}