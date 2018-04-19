import React from "react";

export default function Preview(props) {
	return (
		<div>
			<header>
			  <h1>{props.greeting}, {props.name}!</h1>
			</header>
			<main>
				<h2>{props.message}</h2>
				<p>{props.question}</p>
			</main>
		</div>
	);
}