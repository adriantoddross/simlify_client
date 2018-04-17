import { FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR, RECEIVE_FEEDBACK } from "../actions/trainning"

const initialState = {
	error: null,
	currentQuestion: null,
	userInput: null,
	feedback: null,
	reports: []
}

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_QUESTION_SUCCESS) {
		return Object.assign({}, state, {
			currentQuestion: action.data,
			error: null
		})
	} else if (action.type === FETCH_QUESTION_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		})
	} else if (action.type === RECEIVE_FEEDBACK) {
		return { ...state, feedback: action.feedback }
	}
	return state
}
