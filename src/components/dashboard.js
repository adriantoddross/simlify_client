import React from "react"
import { connect } from "react-redux"
import requiresLogin from "./requires-login"
import { fetchQuestionData } from "../actions/trainning"
import { Link } from "react-router-dom"

export class Dashboard extends React.Component {

	render() {
		const { lastWord, name, id } = this.props
		let renderContent
		if (lastWord) {
			renderContent = (
				<div>
					{/* todo: Preview Component */}
					<div>
						{/* Todo: need id number  `/trainning/${id} /favorite/${id}*/}
						<button>Continue</button>
						<button>Favoriates</button>
					</div>
				</div>
			)
		} else {
			renderContent = (
				<div>
					{/* todo: Preview Component */}
					<div>
						{/* Todo: need id number */}
						<button onClick={() => console.log('Sending to training component...')}>Start new session</button>
						<button>Favoriates</button>
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
