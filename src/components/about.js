import React from "react"
import { openSignUp, openDialog } from "../actions/control"
import { connect } from "react-redux"
import '../css/about.css'
import Sims from '../sims.png'
import MediaQuery from 'react-responsive';

export function About(props) {
	const { dispatch } = props
	const handleOpenDialog = () => {
		dispatch(openDialog());
		return dispatch(openSignUp())
	}
	return (
		<div className="about">
			<MediaQuery query="(min-device-width: 320px)">
				<main role="main" className="about-container">
					<section className="about-image">
						<img src={Sims} alt="4 Sims taking a selfie"/>
					</section>
					<section className="about-info">
						<h1 className="about-header">Learn Simlish at your own pace.</h1>
						<p><b>Simlify</b> is an app that teaches Simlish using spaced repetition. Simlish is a fictional language featured in The Sims, a video-game franchise by EA Games.</p>
						<button className="about-button" onClick={() => handleOpenDialog()}>Get started</button>
					</section>
				</main>
			</MediaQuery>
		</div>
	)
}

export default connect()(About)
