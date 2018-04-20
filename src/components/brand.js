import React from "react"

export default function Brand(props) {
	return (
		<h3
			style={{
				margin: "0",
				color: "white",
				fontFamily: "Cabin Sketch",
				fontWeight: "bold",
				fontSize: "24px"
			}}
		>
			{props.title}
		</h3>
	)
}
