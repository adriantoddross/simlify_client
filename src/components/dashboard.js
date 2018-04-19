import React from "react"
import requiresLogin from "./requires-login"
import Preview from './preview';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchQuestion, generateQuestions} from "../actions/trainning"

export class Dashboard extends React.Component {

	constructor(props) {
		super(props);

		this.state = {Redirect: false};
	}

	componentDidMount(){
		this.props.dispatch(fetchQuestion())
	}

	render() {


		if (this.props.loading) {
			return (
				<div>
					<p>One second, the page is still loading!</p>
				</div>
			);
		}

		if (this.state.Redirect === true) {
			return <Redirect to={`/trainning/${this.props.id}`}/>
		}

		const { name, currentQuestion } = this.props
		let renderContent
		if (currentQuestion) {
			renderContent = (
				<div>
					<Preview greeting="Welcome back" name={name} message="Your last word was" question={currentQuestion.question}/>
					<button onClick={(() => this.setState({Redirect: true}))}>Continue</button>
					<button>Favoriates</button>
				</div>
			)
		} else {
			renderContent = (
				<div>
					<Preview greeting="Hello" name={name} message="Ready to get started?"/>
					<button onClick={e => {	e.preventDefault();
						this.props.dispatch(generateQuestions())
							.then(() => this.setState({Redirect: true}));
					}}
					>Start new session</button>
					<button>Favorites</button>
				</div>
			)
		}

		return (
			<div className="dashboard">
				<div className="dashboard-name"></div>
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
			id: currentUser.id,
			currentQuestion: state.trainning.currentQuestion,
			next: state.trainning.next,
			loading: state.trainning.loading
		}
	} else {
		return {
			name: null,
			id: null

		}
	}
}

export default requiresLogin()(connect(mapStateToProps)(Dashboard))
