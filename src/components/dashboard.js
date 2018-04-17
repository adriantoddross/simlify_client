import React from "react"
import { connect } from "react-redux"
import requiresLogin from "./requires-login"
import { fetchQuestionData } from "../actions/trainning"
import { Link } from "react-router-dom"

export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchQuestionData())
	}

	render() {
		const { lastWord } = this.props.lastWord
		let renderContent
		if (lastWord) {
			renderContent = (
				<div>
					{/* todo: Preview Component */}
					<div>
						{/* Todo: need id number */}
						<Link to="/trainning/:id">Continue</Link>
						<Link to="/favorate/:id">Favoriates</Link>
					</div>
				</div>
			)
		} else {
			renderContent = (
				<div>
					{/* todo: Preview Component */}
					<div>
						{/* Todo: need id number */}
						<Link to="/trainning/:id">Start new session</Link>
						<Link to="/favorate/:id">Favoriates</Link>
					</div>
				</div>
			)
		}

		return (
			<div className="dashboard">
				<div className="dashboard-name">Name: {this.props.firstName}</div>
				{renderContent}
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
