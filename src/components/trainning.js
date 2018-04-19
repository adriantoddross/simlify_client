import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchQuestion, submitAnswer, fetchReport } from "../actions/trainning"
import Input from "./input"
import { Field, reduxForm, focus } from "redux-form"
import Dialog from "material-ui/Dialog"
import Report from "./report"
export class Trainning extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true
		}
	}
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchQuestion())
	}
	onSubmit(values) {
		this.props.dispatch(submitAnswer(values))
	}
	fetchNextQuestion() {
		this.props.dispatch(fetchQuestion())
	}
	handleFetchReport() {
		this.props.dispatch(fetchReport())
	}

	render() {
		const { currentQuestion, feedback, authToken } = this.props
		if (!authToken) {
			return <Redirect to="/" />
		}
		if (!currentQuestion) return <div />
		let renderFeedback
		if (feedback) {
			renderFeedback = <p>{feedback}</p>
		}

		return (
			<div>
				<header>
					<h1>What does {currentQuestion.question} mean?</h1>
				</header>
				{renderFeedback}
				<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					<label htmlFor="answer">Your Answer</label>
					<Field type="text" name="answer" component={Input} autocomplete="off" />
					<button disabled={this.props.next} type="submit">
						Submit Answer
					</button>
					<button disabled={!this.props.next} onClick={() => this.fetchNextQuestion()}>
						Next Question
					</button>
					<button onClick={() => this.handleFetchReport()}>End session</button>
				</form>
				<Dialog title="Dialog With Actions" modal={true} open={this.state.open}>
					<Report />
					<div>
						<button>Start new session</button>
					</div>
				</Dialog>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		currentQuestion: state.trainning.currentQuestion,
		feedback: state.trainning.feedback,
		authToken: state.user.authToken,
		next: state.trainning.next
	}
}
export default reduxForm({
	form: "question",
	onSubmitFail: (errors, dispatch) => dispatch(focus("question", Object.keys(errors)[0]))
})(connect(mapStateToProps)(Trainning))
