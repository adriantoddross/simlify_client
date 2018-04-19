import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import NoMatch from "./nomatch"
export default () => Component => {
	function RequiresLogin(props) {
		const { authenticating, loggedIn, error, id, match, ...passThroughProps } = props
		if (authenticating) {
			return <div>Logging in...</div>
		} else if (!loggedIn || error) {
			return <Redirect to="/" />
		}
		if (id && id !== match.params.id) {
			return <NoMatch />
		}
		return <Component {...passThroughProps} />
	}

	const displayName = Component.displayName || Component.name || "Component"
	RequiresLogin.displayName = `RequiresLogin(${displayName})`

	const mapStateToProps = (state, props) => ({
		authenticating: state.user.loading,
		loggedIn: state.user.currentUser !== null,
		error: state.user.error,
		id: state.user.currentUser ? state.user.currentUser.id : null
	})
	return connect(mapStateToProps)(RequiresLogin)
}
