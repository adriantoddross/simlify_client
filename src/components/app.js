import React from "react"
import { connect } from "react-redux"
import { Route, withRouter } from "react-router-dom"

import HeaderBar from "./header-bar"
import LandingPage from "./landing-page"
import Dashboard from "./dashboard"
export class App extends React.Component {
	render() {
		return (
			<div className="app">
				<HeaderBar />
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/:id/dashboard" component={Dashboard} />
				{/* <Route exact path="/:id/trainning" component={Dashboard} /> */}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	hasAuthToken: state.auth.authToken !== null,
	loggedIn: state.auth.currentUser !== null
})

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App))
