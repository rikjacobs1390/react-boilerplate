import React from "react";
import { renderToString } from "react-dom/server";

import App from "./components/app";

// Get data fo start of application!
import request from "axios";

const getPokemon = {
	withAbility: ability => {
		const baseUrl = "http://pokeapi.co/api/v2/ability";
		return request.get(`${baseUrl}/${ability}`);
	}
};

const renderIndexHTML = (req, res, pokemons) => {
	// If we are in production mode: we render the app completly clientSide
	if (process.env.NODE_ENV === "development") {
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>Boilerplate</title>
				</head>
				<body>
				${req.locale}
				${JSON.stringify(pokemons)}
				<div id='app'></div>
					<script src='bundle.js'></script>
				</body>
			</html>
		`);
	} else if (process.env.NODE_ENV === "production") {
		// In production mode we want to load the app server side first!
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>Boilerplate</title>
					<link rel='stylesheet' href='bundle.css'>
				</head>
				<body>
					${req.locale}
					${JSON.stringify(pokemons)}
					<div id='app'>
						${renderToString(<App locale={req.locale} />)}
					</div>
					<script src='bundle.js'></script>
				</body>
			</html>
		`);
	}
};

export default (req, res) => {
	getPokemon
		.withAbility("telepathy")
		.then(resp => {
			const pokemons = { list: resp.data.pokemon };
			console.log(pokemons);
			renderIndexHTML(req, res, pokemons);
		})
		.catch(err => res.status(404).send(`${err}: Oh No! No pokemons found!`));
};
