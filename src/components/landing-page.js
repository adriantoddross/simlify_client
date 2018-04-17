import React from "react"
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import LoginForm from "./login-form"
import RegistrationForm from "./registration-form"
import About from "./about"

export class LandingPage extends React.Component {
	render() {
		if (this.props.loggedIn) {
			return <Redirect to="/dashboard" />
		}
		let showForm

		if (this.props.currentTab) {
			if (this.props.currentTab === "signup") {
				showForm = <RegistrationForm />
			} else {
				showForm = <LoginForm />
			}
		}
		return (
			<div>
				<About />
				{/* todo: Need to have a Overlay Component when currentTab is either signup or login */}
				<div>{showForm}</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	currentTab: state.control.currentTab
})

export default connect(mapStateToProps)(LandingPage)

// const {firstName, userName, password, ...} = req.body
// const newUser = {
//     firstname,
//     userName,
//     password,
//     ..
// }
// User.create({
//     local:{
//         newUser
//     }
// })
