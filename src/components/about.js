import React from "react"
import { openSignUp } from "../actions/control"
import { connect } from "react-redux"
export function About(props) {
	const { dispatch } = props
	const handleOpenSignUp = () => {
		return dispatch(openSignUp())
	}
	return (
		<div>
			<main role="main">
				<h3>Learn Simlify Language</h3>
				<p>Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
				<button onClick={() => handleOpenSignUp()}>Get Started</button>
			</main>
			<aside>{/* todo: Gif for how app works */}</aside>
		</div>
	)
}

export default connect()(About)
