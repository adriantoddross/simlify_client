import {
	FETCH_QUESTION_REQUEST,
	FETCH_QUESTION_SUCCESS,
	FETCH_QUESTION_ERROR,
	GENERATE_QUESTIONS_REQUEST,
	GENERATE_QUESTIONS_SUCCESS,
	GENERATE_QUESTIONS_ERROR,
	SUBMIT_ANSWER_REQUEST,
	SUBMIT_ANSWER_SUCCESS,
	SUBMIT_ANSWER_ERROR,
	FETCH_REPORT_REQUEST,
	FETCH_REPORT_SUCCESS,
	FETCH_REPORT_ERROR
} from "../actions/trainning"

const initialState = {
	next: false,
	currentQuestion: null,
	feedback: null,
	loading: null,
	error: null,
	report: null
}

export default function trainingReducer(state = initialState, action) {
	switch (action.type) {
	case FETCH_QUESTION_REQUEST:
		return Object.assign({}, state, { loading: true })

	case FETCH_QUESTION_SUCCESS:
		return Object.assign({}, state, {
			currentQuestion: action.question,
			error: null,
			loading: false,
			next: false,
			feedback: null
		})

	case FETCH_QUESTION_ERROR:
		return Object.assign({}, state, { loading: false, error: action.error })

	case GENERATE_QUESTIONS_REQUEST:
		return Object.assign({}, state, { loading: true })

	case GENERATE_QUESTIONS_SUCCESS:
		return Object.assign({}, state, { loading: false })

	case GENERATE_QUESTIONS_ERROR:
		return Object.assign({}, state, { loading: false, error: action.error })

	case SUBMIT_ANSWER_REQUEST:
		return Object.assign({}, state, { loading: true })

	case SUBMIT_ANSWER_SUCCESS:
		return Object.assign({}, state, { feedback: action.feedback, loading: false, next: true })

	case SUBMIT_ANSWER_ERROR:
		return Object.assign({}, state, { loading: false, error: action.error })
	case FETCH_REPORT_REQUEST:
		return Object.assign({}, state, { loading: true })
	case FETCH_REPORT_SUCCESS: {
		return Object.assign({}, state, { report: action.report, loading: false, error: action.error })
	}
	case FETCH_REPORT_ERROR:
		return Object.assign({}, state, { report: null, loading: false, error: action.error })
	default:
		return state
	}
}
