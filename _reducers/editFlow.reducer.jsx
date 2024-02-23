import { editFlowConstants } from '../_constants';

export function editFlow(state = [], action) {
    switch (action.type) {
        case editFlowConstants.ADD:
            return action.data
        case editFlowConstants.CLEAR:
            return [];
        default:
            return state
    }
}