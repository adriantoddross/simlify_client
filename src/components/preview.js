import React from "react";

export default function Preview(props) {
	return (
		<div className="preview">
			<header>
			  <h1 className="preview-header">{props.greeting}, <span className="preview-name">{props.name}</span>!</h1>
			</header>
			<main>
				<h2 className="preview-message">{props.message}</h2>
				<p className="preview-question">{props.question}</p>
			</main>
		</div>
	);
}