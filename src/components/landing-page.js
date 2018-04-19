import React from "react"
import Dialog from 'material-ui/Dialog';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { closeDialog}  from '../actions/control';
import LoginForm from "./login-form"
import RegistrationForm from "./registration-form"
import About from "./about"


export class LandingPage extends React.Component {

	handleCloseDialog() {
		// dispatch dialog state from true to false
		console.log('closing...');
		this.props.dispatch(closeDialog())
	}

	render() {

		if (this.props.loggedIn) {
			return <Redirect to={`/dashboard/${this.props.id}`} />
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
				<Dialog title="" modal={false} open={this.props.dialog} onRequestClose={() => this.handleCloseDialog()}>
					{showForm}
				</Dialog>
				<About openDialog={() => this.setState({open: true})}/>
				{/* todo: Need to have a Overlay Component when currentTab is either signup or login */}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.user.currentUser !== null,
	currentTab: state.control.currentTab,
	id: state.user.currentUser ? state.user.currentUser.id : null,
	dialog: state.control.dialog
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
