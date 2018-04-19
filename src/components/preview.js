import React from "react";

export function preview(props) {
	return (
		<div>
			<header>
			  <h1>{props.greeting}, {props.name}!</h1>
			</header>
			<main>
				<h2>Your last learned word was</h2>
				<p>{props.question}</p>
			</main>
		</div>
	);
}