import { createStore, applyMiddleware, combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import thunk from "redux-thunk"
import { loadAuthToken } from "./local-storage"
import userReducer from "./reducers/auth"
import trainningReducer from "./reducers/trainning"
import controlReducer from "./reducers/control"
import { setAuthToken, refreshAuthToken } from "./actions/auth"
import { composeWithDevTools } from "redux-devtools-extension"
const store = createStore(
	combineReducers({
		form: formReducer,
		user: userReducer,
		trainning: trainningReducer,
		control: controlReducer
	}),
	composeWithDevTools(
		applyMiddleware(thunk)
		// other store enhancers if any
	)
)

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken()
if (authToken) {
	const token = authToken
	store.dispatch(setAuthToken(token))
	store.dispatch(refreshAuthToken())
}

export default store
