import React from "react"
import requiresLogin from "./requires-login"
import { Preview } from './preview';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { generateQuestions} from "../actions/trainning"

export class Dashboard extends React.Component {

	constructor(props) {
		super(props);

		this.state = {Redirect: false};
	}

	render() {
		if (this.state.Redirect === true) {
			return <Redirect to={`/trainning/${this.props.id}`}/>
		}

		const { lastWord, name, id } = this.props
		let renderContent
		if (lastWord) {
			renderContent = (
				<div>
					{/* todo: Preview Component */}
					<div>
						{/* Todo: need id number  `/trainning/${id} /favorite/${id}*/}
						<button onClick={(() => this.setState({Redirect: true}))}>Continue</button>
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
						<button onClick={e => {	e.preventDefault();
							this.props.dispatch(generateQuestions())
								.then(() => this.setState({Redirect: true}));
						}}
						>Start new session</button>
						<button>Favorites</button>
					</div>
				</div>
			)
		}

		return (
			<div className="dashboard">
				<div className="dashboard-name">Name: {this.props.name}</div>
				{renderContent}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.user
	if (currentUser) {
		return {
			name: currentUser.firstname,
			id: currentUser.id
		}
	} else {
		return {
			name: null,
			id: null
		}
	}
}

export default requiresLogin()(connect(mapStateToProps)(Dashboard))
