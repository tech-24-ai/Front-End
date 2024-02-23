import { breadcrumbConstants } from '../_constants';

export const breadcrumbActions = {
    add,
    clear
};

function add(data) {
    return { type: breadcrumbConstants.ADD, data };
}

function clear() {
    return { type: breadcrumbConstants.CLEAR };
}