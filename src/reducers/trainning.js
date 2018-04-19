import { FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR, GENERATE_QUESTIONS_REQUEST, GENERATE_QUESTIONS_SUCCESS, GENERATE_QUESTIONS_ERROR, SUBMIT_ANSWER_REQUEST, SUBMIT_ANSWER_SUCCESS, SUBMIT_ANSWER_ERROR } from "../actions/trainning"

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

	case FETCH_QUESTION_REQUEST : return Object.assign({}, state, {loading: true});

	case FETCH_QUESTION_SUCCESS : return Object.assign({}, state, {currentQuestion: action.question, error: null, loading: false, next: false});

	case FETCH_QUESTION_ERROR : return Object.assign({}, state, {loading: false, error: action.error});

	case GENERATE_QUESTIONS_REQUEST : return Object.assign({}, state, {loading: true});

	case GENERATE_QUESTIONS_SUCCESS : return Object.assign({}, state, {loading: false});

	case GENERATE_QUESTIONS_ERROR : return Object.assign({}, state, {loading: false, error: action.error});

	case SUBMIT_ANSWER_REQUEST : return Object.assign({}, state, {loading: true});

	case SUBMIT_ANSWER_SUCCESS : return Object.assign({}, state, {feedback: action.feedback, loading: false});

	case SUBMIT_ANSWER_ERROR : return Object.assign({}, state, {loading: false, error: action.error});


	default : return state;
	}

};