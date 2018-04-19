import { FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR, RECEIVE_FEEDBACK, GENERATE_QUESTIONS_REQUEST, GENERATE_QUESTIONS_SUCCESS, GENERATE_QUESTIONS_ERROR } from "../actions/trainning"

const initialState = {
	name: null,
	loading: null,
	error: null,
	next: false,
	currentQuestion: null,
	userInput: null,
	feedback: null,
	reports: []
}

export default function trainingReducer(state=initialState, action) {
	switch (action.type) {

	case FETCH_QUESTION_SUCCESS : return Object.assign({}, state, {currentQuestion: action.data, error: null, loading: false, next: false});

	case FETCH_QUESTION_ERROR : return Object.assign({}, state, {loading: false, error: action.error});

	case RECEIVE_FEEDBACK : return { ...state, feedback: action.feedback, next: true };

	case GENERATE_QUESTIONS_REQUEST : return Object.assign({}, state, {loading: true});

	case GENERATE_QUESTIONS_SUCCESS : return Object.assign({}, state, {loading: false});

	case GENERATE_QUESTIONS_ERROR : return Object.assign({}, state, {loading: false, error: action.error});

	default : return state;
	}

};