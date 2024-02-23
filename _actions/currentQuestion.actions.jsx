import { currentQuestionConstants } from '../_constants';

export const currentQuestionActions = {
    _clear,
    _addData,
};

function _clear() {
    return { type: currentQuestionConstants.CLEAR };
}

function _addData(data) {
    return { type: currentQuestionConstants.ADD, data };
}