import { advancedModuleConstants } from '../_constants';

export function advancedModule(state = [], action) {
    switch (action.type) {
        case advancedModuleConstants.ADD:
            return action.data
        case advancedModuleConstants.CLEAR:
            return [];
        default:
            return state
    }
}