import { SubmissionError } from "redux-form"
import { API_BASE_URL } from "../config"
import { normalizeResponseErrors } from "./utils"
import { login } from "./auth"

export const localRegister = user => dispatch => {
	console.log(user);
	return fetch(`${API_BASE_URL}/signup/local`, {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(res => {return normalizeResponseErrors(res)})
		.then(res => {
			console.log(res);
			res.json(res)})
		.then(user => {
			return dispatch(login(user.username, user.password))
		})
		.catch(err => {
			const { reason, message, location } = err
			if (reason === "ValidationError") {
				// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				)
			}
		})
}
