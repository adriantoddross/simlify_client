import React from "react"
import { connect } from "react-redux"
export function Report(props) {
	if (props.loading || !props.reports) {
		return <div>Page is loading ...</div>
	}
	if (props.error) {
		return <div>Something is not right</div>
	}
	const renderReport = props.reports.map((report, index) => {
		let renderStat
		if (report.inCorrect) {
			renderStat = <div>It took you {report.inCorrect} tries to remember this word</div>
		}
		renderStat = <div>You have pretty good handle on this word</div>
		if (report.totalAttempt !== 0) {
			return (
				<li key={index}>
					<div>
						<strong>{report.question}</strong> : {report.answer}
					</div>
					{renderStat}
				</li>
			)
		}
	})
	return <ul>{renderReport}</ul>
}

const mapStateToProps = state => ({
	reports: state.trainning.report,
	loading: state.trainning.loading,
	error: state.trainning.error
})

export default connect(mapStateToProps)(Report)
