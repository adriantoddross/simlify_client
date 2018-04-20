import React from "react"
import { Field, reduxForm, focus } from "redux-form"
import Input from "./input"
import { login } from "../actions/auth"
import { required, nonEmpty } from "../validators"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

export class LoginForm extends React.Component {
	onSubmit(values) {
		const { dispatch } = this.props
		return dispatch(login(values))
	}

	render() {
		let error
		if (this.props.error) {
			error = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			)
		}
		return (
			<form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				{error}
				<label htmlFor="username">Username</label>
				<Field component={Input} placeholder="sally123" type="text" name="username" id="username" validate={[required, nonEmpty]} />
				<label htmlFor="password">Password</label>
				<Field component={Input} placeholder="••••••••" type="password" name="password" id="password" validate={[required, nonEmpty]} />
				<button className="form-primary-button" disabled={this.props.pristine || this.props.submitting}>Log in</button>
			</form>
		)
	}
}

export default reduxForm({
	form: "login",
	onSubmitFail: (errors, dispatch) => dispatch(focus("login", "username"))
})(withRouter(connect()(LoginForm)))
