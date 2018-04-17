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
	return fetch(`${API_BASE_URL}/:id/trainning`, {
		method: "GET",
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({ data }) => dispatch(fetchQuestionSuccess(data)))
		.catch(err => {
			dispatch(fetchQuestionError(err))
		})
}
