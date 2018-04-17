import React from "react"
import { connect } from "react-redux"
import requiresLogin from "./requires-login"
import { fetchQuestionData } from "../actions/trainning"

export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchQuestionData())
	}

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-name">Name: {this.props.firstName}</div>
				{/* todo: Preview Component */}
				<div>This is DashBoard</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.auth
	return {
		name: currentUser.firstName
	}
}

export default requiresLogin()(connect(mapStateToProps)(Dashboard))
