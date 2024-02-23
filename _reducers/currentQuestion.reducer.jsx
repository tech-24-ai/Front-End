import { currentQuestionConstants } from '../_constants';

export function currentQuestion(state = [], action) {
    switch (action.type) {
        case currentQuestionConstants.ADD:
            return action.data
        case currentQuestionConstants.CLEAR:
            return [];
        default:
            return state
    }
}