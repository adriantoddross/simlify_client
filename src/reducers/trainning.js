import { FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR } from "../actions/trainning"

const initialState = {
	error: null,
	currentQuestion: null,
	userInput: null,
	currentAnwser: null,
	reports: []
}

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_QUESTION_SUCCESS) {
		return Object.assign({}, state, {
			data: action.data,
			error: null
		})
	} else if (action.type === FETCH_QUESTION_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		})
	}
	return state
}
