import { questionConstants } from '../_constants';

export const questionActions = {
    _clear,
    _addData,
};

function _clear() {
    return { type: questionConstants.CLEAR };
}

function _addData(data) {
    return { type: questionConstants.ADD, data };
}