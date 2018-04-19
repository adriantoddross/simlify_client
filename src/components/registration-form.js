import React from "react"
import { Field, reduxForm, focus } from "redux-form"
import { localRegister } from "../actions/users"
import { Link} from "react-router-dom"
import Input from "./input"
import { required, nonEmpty, matches, length, isTrimmed } from "../validators"
import { openLogin } from "../actions/control"

const passwordLength = length({ min: 10, max: 72 })
const matchesPassword = matches("password")

export class RegistrationForm extends React.Component {
	onSubmit(values) {
		const { username, password, firstname } = values
		const user = { username, password, firstname }
		return this.props.dispatch(localRegister(user))
	}

	handleLoginCLick() {
		this.props.dispatch(openLogin())
	}

	render() {
		return (
			<form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="firstName">First name</label>
				<Field component={Input} type="text" name="firstname" />
				<label htmlFor="username">Username</label>
				<Field component={Input} type="text" name="username" validate={[required, nonEmpty, isTrimmed]} />
				<label htmlFor="password">Password</label>
				<Field component={Input} type="password" name="password" validate={[required, passwordLength, isTrimmed]} />
				<label htmlFor="passwordConfirm">Confirm password</label>
				<Field
					component={Input}
					type="password"
					name="passwordConfirm"
					validate={[required, nonEmpty, matchesPassword]}
				/>
				<button type="submit" disabled={this.props.pristine || this.props.submitting}>
					Register
				</button>
				<Link to="/" onClick={() => this.handleLoginClick()}>
					Login
				</Link>
			</form>
		)
	}
}

export default reduxForm({
	form: "registration",
	onSubmitFail: (errors, dispatch) => dispatch(focus("registration", Object.keys(errors)[0]))
})(RegistrationForm)
