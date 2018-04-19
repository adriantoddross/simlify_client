import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import App from "./components/app"
import store from "./store"
import "./index.css"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<MuiThemeProvider>
				<App />
			</MuiThemeProvider>
		</Router>
	</Provider>,
	document.getElementById("root")
)
