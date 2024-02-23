import { questionConstants } from '../_constants';

export function questionData(state = [], action) {
    switch (action.type) {
        case questionConstants.ADD:
            return action.data
        case questionConstants.CLEAR:
            return [];
        default:
            return state
    }
}