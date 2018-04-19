import { API_BASE_URL } from "../config"
import { normalizeResponseErrors } from "./utils"

export const FETCH_QUESTION_SUCCESS = "FETCH_QUESTION_SUCCESS"
export const fetchQuestionSuccess = data => ({
	type: FETCH_QUESTION_SUCCESS,
	data
})

export const FETCH_QUESTION_ERROR = "FETCH_QUESTION_ERROR"
export const fetchQuestionError = error => ({
	type: FETCH_QUESTION_ERROR,
	error
})

export const fetchQuestionData = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	return fetch(`${API_BASE_URL}/simlish/question`, {
		method: "GET",
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({ data }) => {
			dispatch(fetchQuestionSuccess(data));
		})
		.catch(err => {
			dispatch(fetchQuestionError(err))
		})
}

export const RECEIVE_FEEDBACK = "RECEIVE_FEEDBACK"
export const receiveFeedBack = feedback => ({
	type: RECEIVE_FEEDBACK,
	feedback
})

export const sendAnswerData = answer => (dispatch, getState) => {
	// 	const authToken = getState().auth.authToken
	// 	return fetch(`${API_BASE_URL}/answer`, {
	// 	method: "POST",
	// 	headers: {
	// 		// Provide our auth token as credentials
	// 		Authorization: `Bearer ${authToken}`
	// 	},
	// 	body:JSON.stringify(answer)
	// })
	// 	.then(res => normalizeResponseErrors(res))
	// 	.then(res => res.json())
	// 	.then(feedback => {
	// 		dispatch(receiveFeedBack(feedback))
	// 	})
	// 	.catch(err => {
	// 		dispatch(fetchQuestionError(err))
	// 	})

	// return from server
	const goodfeedback = "Good"
	const badfeedback = "bad"
	dispatch(receiveFeedBack(goodfeedback))
}


export const GENERATE_QUESTIONS_REQUEST = "GENERATE_QUESTIONS_REQUEST"
export const generateQuestionsRequest = () => ({
	type: GENERATE_QUESTIONS_REQUEST,
});

export const GENERATE_QUESTIONS_SUCCESS = "GENERATE_QUESTIONS_SUCCESS"
export const generateQuestionsSuccess = () => ({
	type: GENERATE_QUESTIONS_SUCCESS,
});

export const GENERATE_QUESTIONS_ERROR = "GENERATE_QUESTIONS_ERROR"
export const generateQuestionsError = error => ({
	type: GENERATE_QUESTIONS_ERROR,
	error
});

export const generateQuestions = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	dispatch(generateQuestionsRequest);
	return fetch(`${API_BASE_URL}/simlish/generate`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => {
			return normalizeResponseErrors(res)})
		.then(res => {
			return res.json(res)})
		.then((res) => {
			console.info('Successfully generated questions:', res);
			dispatch(generateQuestionsSuccess());
		})
		.catch(err => {
			dispatch(generateQuestionsError(err))
		})
}