import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchQuestion, submitAnswer, fetchReport } from "../actions/trainning"
import Input from "./input"
import { Field, reduxForm, focus, reset } from "redux-form"
import Dialog from "material-ui/Dialog"
import Report from "./report"
import GoRocket from "react-icons/lib/go/rocket"
import GoX from "react-icons/lib/go/x"
import GoQuote from "react-icons/lib/go/quote"
export class Trainning extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}
	handleOpen() {
		this.setState({
			open: true
		})
	}
	handleClose() {
		this.setState({
			open: false
		})
	}
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchQuestion())
	}
	onSubmit(values) {
		this.props.dispatch(reset("question"))
		this.props.dispatch(submitAnswer(values))
	}
	fetchNextQuestion(e) {
		e.preventDefault()
		this.props.dispatch(fetchQuestion())
	}
	handleFetchReport(e) {
		e.preventDefault()
		this.handleOpen()
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
			if (feedback.status === "good") {
				renderFeedback = (
					<p>
						<GoRocket color={"green"} /> Horray !
					</p>
				)
			} else {
				renderFeedback = (
					<p>
						<GoX color={"red"} /> You got it wrong! It's
						<span>"{feedback.correctAnswer}"</span>
					</p>
				)
			}
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
					<button disabled={!this.props.next} onClick={e => this.fetchNextQuestion(e)}>
						Next Question
					</button>
					<button onClick={e => this.handleFetchReport(e)}>End session</button>
				</form>
				<Dialog title="Dialog With Actions" modal={true} open={this.state.open}>
					<Report />
					<div>
						<button onClick={e => this.handleClose()}>Start new session</button>
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
