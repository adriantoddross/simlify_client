import React from "react"
import { openSignUp, openDialog } from "../actions/control"
import { connect } from "react-redux"
import '../css/about.css'

export function About(props) {
	const { dispatch } = props
	const handleOpenDialog = () => {
		dispatch(openDialog());
		return dispatch(openSignUp())
	}
	return (
		<div className="about">
			<main role="main" className="about-container">
				<section className="about-info">
					<h1 className="about-header">Learn at your own pace.</h1>
					<p className="about-desc"><b>Simlify</b> is an app that teaches Simlish using spaced repetition. Simlish is a fictional language featured in The Sims, a video-game franchise by EA Games.</p>
					<button className="about-button" onClick={() => handleOpenDialog()}>Get started</button>
				</section>
				<section className="about-image">
					<img src="https://www.actualidadsims.com/uploads/monthly_2017_04/large.ls4-render-selfie-2.png.6bc76fdee9166ef23697a2390f8bbb68.png" alt="4 Sims taking a selfie"/>
				</section>
			</main>
			<aside>{/* todo: Gif for how app works */}</aside>
		</div>
	)
}

export default connect()(About)
