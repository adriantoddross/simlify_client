import React from "react"
import { connect } from "react-redux"
import { Route, withRouter, Switch } from "react-router-dom"
import HeaderBar from "./header-bar"
import LandingPage from "./landing-page"
import Dashboard from "./dashboard"
import NoMatch from "./nomatch"
import Trainning from "./trainning"
export class App extends React.Component {
	render() {
		return (
			<div className="app">
				<HeaderBar />

				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/dashboard/:id" component={Dashboard} />
					<Route exact path="/trainning/:id" component={Trainning} />
					<Route component={NoMatch} />
				</Switch>
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
