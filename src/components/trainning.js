import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchQuestion, sendAnswerData } from "../actions/trainning"
import Input from "./input"
import { Field, reduxForm, focus } from "redux-form"
export class Trainning extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchQuestion())
	}
	onSubmit(values) {
		this.props.dispatch(sendAnswerData(values))
	}
	fetchNextQuestion() {
		this.props.dispatch(fetchQuestion())
	}

	render() {
		const { currentQuestion, feedback, authToken } = this.props
		if (!authToken) {
			return <Redirect to="/" />
		}
		if (!currentQuestion) return <div />
		let renderFeedback
		if (feedback) {
			renderFeedback = <div>{feedback}</div>
		}

		return (
			<div>
				<div>
					<h1>{currentQuestion.question}</h1>
				</div>
				{renderFeedback}
				<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					<label htmlFor="answer">Your Answer</label>
					<Field type="text" name="answer" component={Input} />
					<button disabled={this.props.next} type="submit">
						submit
					</button>
					<button disabled={!this.props.next} onClick={() => this.fetchNextQuestion()}>
						next
					</button>
				</form>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		currentQuestion: state.trainning.currentQuestion,
		feedback: state.trainning.feedback,
		authToken: state.auth.authToken,
		next: state.trainning.next
	}
}
export default reduxForm({
	form: "question",
	onSubmitFail: (errors, dispatch) => dispatch(focus("question", Object.keys(errors)[0]))
})(connect(mapStateToProps)(Trainning))
