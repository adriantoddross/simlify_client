import { OPEN_SIGN_UP, OPEN_LOGIN } from "../actions/control"

const initialState = {
	currentTab: null
}

export default function controlReducer(state = initialState, action) {
	if (action.type === OPEN_SIGN_UP) {
		console.log("helo")
		return { ...state, currentTab: "signup" }
	}
	if (action.type === OPEN_LOGIN) {
		return { ...state, currentTab: "login" }
	}
	return state
}
