import { connectConstants } from '../_constants';

export const connectActions = {
    _clear,
    _addData,
};

function _clear() {
    return { type: connectConstants.CLEAR };
}

function _addData(data) {
    return { type: connectConstants.ADD, data };
}
