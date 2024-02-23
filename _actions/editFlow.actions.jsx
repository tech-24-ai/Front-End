import { editFlowConstants } from '../_constants';

export const editFlowActions = {
    _clear,
    _addData,
};

function _clear() {
    return { type: editFlowConstants.CLEAR };
}

function _addData(data) {
    return { type: editFlowConstants.ADD, data };
}