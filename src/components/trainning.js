import React from "react"
import { connect } from "react-redux"
import { fetchQuestionData } from "../actions/trainning"
import Input from "./input"
import { Field, reduxForm, focus } from "redux-form"
export class Trainning extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchQuestionData())
	}
	onSubmit(values) {}
	render() {
		const { currentQuestion } = this.props
		if (!currentQuestion) return <div />
		return (
			<div>
				<div>{currentQuestion.question}</div>
				<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					<label htmlFor="answer">Your Answer</label>
					<Field type="text" name="answer" component={Input} />
					<button>submit</button>
				</form>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		currentQuestion: state.trainning.currentQuestion
	}
}
export default reduxForm({
	form: "question",
	onSubmitFail: (errors, dispatch) => dispatch(focus("question", Object.keys(errors)[0]))
})(connect(mapStateToProps)(Trainning))
