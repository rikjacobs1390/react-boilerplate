import React from "react";
import { Switch, Route } from "react-router-dom";
if (process.env.WEBPACK) require("./index.scss");

export default function App(props) {
	console.log(props);

	return <div>Apppp!!</div>;
}
