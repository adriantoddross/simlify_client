import { SubmissionError } from "redux-form"
import { API_BASE_URL } from "../config"
import { normalizeResponseErrors } from "./utils"
import { login } from "./auth"

export const localRegister = user => dispatch => {
	return fetch(`${API_BASE_URL}/signup/local`, {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			const newUser = {username: user.username, password: user.password};
			console.log(newUser);
			return dispatch(login(newUser))
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
