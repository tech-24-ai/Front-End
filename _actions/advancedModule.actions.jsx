import { advancedModuleConstants } from '../_constants';

export const advancedModuleActions = {
    _clear,
    _addData,
};

function _clear() {
    return { type: advancedModuleConstants.CLEAR };
}

function _addData(data) {
    return { type: advancedModuleConstants.ADD, data };
}