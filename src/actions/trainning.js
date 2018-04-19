import { API_BASE_URL } from "../config"
import { normalizeResponseErrors } from "./utils"


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
	const authToken = getState().user.authToken
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

export const FETCH_QUESTION_REQUEST = "FETCH_QUESTION_REQUEST"
export const fetchQuestionRequest = () => ({
	type: FETCH_QUESTION_SUCCESS
})


export const FETCH_QUESTION_SUCCESS = "FETCH_QUESTION_SUCCESS"
export const fetchQuestionSuccess = question => ({
	type: FETCH_QUESTION_SUCCESS,
	question
})

export const FETCH_QUESTION_ERROR = "FETCH_QUESTION_ERROR"
export const fetchQuestionError = error => ({
	type: FETCH_QUESTION_ERROR,
	error
})

export const fetchQuestion = () => (dispatch, getState) => {
	const authToken = getState().user.authToken
	dispatch(fetchQuestionRequest());
	return fetch(`${API_BASE_URL}/simlish/question`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => {return normalizeResponseErrors(res);})
		.then(res => {return res.json(res);})
		.then((question) => {
			console.log(question);
			dispatch(fetchQuestionSuccess(question));
		})
		.catch(err => {
			dispatch(fetchQuestionError(err))
		})
}

export const SUBMIT_ANSWER_REQUEST = "SUBMIT_ANSWER_REQUEST"
export const submitAnswerRequest = () => ({
	type: SUBMIT_ANSWER_REQUEST,
});

export const SUBMIT_ANSWER_SUCCESS = "SUBMIT_ANSWER_SUCCESS"
export const submitAnswerSuccess = feedback => ({
	type: SUBMIT_ANSWER_SUCCESS,
	feedback
});

export const SUBMIT_ANSWER_ERROR = "SUBMIT_ANSWER_ERROR"
export const submitAnswerError = error => ({
	type: SUBMIT_ANSWER_ERROR,
	error
});

export const submitAnswer = answer => (dispatch, getState) => {
	const authToken = getState().user.authToken
	dispatch(submitAnswerSuccess);
	return fetch(`${API_BASE_URL}/simlish/answer`, {
		method: "POST",
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`
		},
		body:JSON.stringify(answer)
	})
		.then(res => {return normalizeResponseErrors(res);})
		.then(res => {return res.json(res);})
		.then(feedback => {
			console.log(feedback);
			dispatch(submitAnswerSuccess(feedback));
		})
		.catch(err => {
			dispatch(submitAnswerError(err));
		})
}
