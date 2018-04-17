import React from "react"
import { connect } from "react-redux"
import requiresLogin from "./requires-login"
import { fetchQuestionData } from "../actions/trainning"
import { Link } from "react-router-dom"

export class Dashboard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { lastWord, name, id } = this.props
		let renderContent
		if (lastWord) {
			renderContent = (
				<div>
					{/* todo: Preview Component */}
					<div>
						{/* Todo: need id number */}
						<Link to={`/trainning/${id}`}>Continue</Link>
						<Link to={`/favorite/${id}`}>Favoriates</Link>
					</div>
				</div>
			)
		} else {
			renderContent = (
				<div>
					{/* todo: Preview Component */}
					<div>
						{/* Todo: need id number */}
						<Link to={`/trainning/${id}`}>Start new session</Link>
						<Link to={`/favorite/${id}`}>Favoriates</Link>
					</div>
				</div>
			)
		}

		return (
			<div className="dashboard">
				<div className="dashboard-name">Name: {name}</div>
				{renderContent}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.auth
	if (currentUser) {
		return {
			name: currentUser.firstName,
			lastWord: currentUser.lastWord,
			id: currentUser.id
		}
	} else {
		return {
			name: null,
			lastWord: null,
			id: null
		}
	}
}

export default requiresLogin()(connect(mapStateToProps)(Dashboard))
