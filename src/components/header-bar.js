import React from "react"
import { connect } from "react-redux"
import { clearAuth } from "../actions/auth"
import { clearAuthToken } from "../local-storage"
import Brand from "./brand"
import { openLogin, openSignUp, openDialog, closeDialog } from "../actions/control"
import "../css/header-nav.css"

export class HeaderBar extends React.Component {
	logOut() {
		this.props.dispatch(clearAuth())
		clearAuthToken()
		this.props.dispatch(closeDialog())
	}
	signUp() {
		// todo: signup data flow
		this.props.dispatch(openDialog())
		this.props.dispatch(openSignUp())
	}
	logIn(data) {
		//todo: log in data flow
		this.props.dispatch(openDialog())
		this.props.dispatch(openLogin())
	}

	render() {
		// Only render the log out button if we are logged in
		let logOutButton
		let unAuthorizedButton
		if (this.props.loggedIn) {
			logOutButton = (
				<button className="header-primary-button" onClick={() => this.logOut()}>
					Log out
				</button>
			)
		} else {
			unAuthorizedButton = (
				<div>
					<button className="header-button" onClick={() => this.signUp()}>
						Sign Up
					</button>
					<button className="header-primary-button" onClick={() => this.logIn()}>
						Log In
					</button>
				</div>
			)
		}

		return (
			<div className="header-bar">
				<div className="header-brand-container">
					<Brand title="Simlify" />
				</div>
				<div className="header-buttons-container">
					{logOutButton}
					{unAuthorizedButton}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.user.currentUser !== null
})

export default connect(mapStateToProps)(HeaderBar)
