import path from "path";
import express from "express";
import webpack from "webpack";
import locale from "locale";
import middleware from "./src/middleware";

// Start express app
const app = express();
const port = 3000;

// Set locale and languages and stuff!
const supported = ["en", "en-US", "nl", "nl-NL"];
app.use(locale(supported));

// set stuff based on environment
if (process.env.NODE_ENV === "development") {
	const config = require("./webpack.config.dev");
	const compiler = webpack(config);
	app.use(
		require("webpack-dev-middleware")(compiler, {
			noInfo: true,
			publicPath: config.output.publicPath,
			stats: {
				assets: false,
				colors: true,
				version: false,
				hash: false,
				timings: false,
				chunks: false,
				chunkModules: false
			}
		})
	);
	app.use(require("webpack-hot-middleware")(compiler));
	app.use(express.static(path.resolve(__dirname, "src")));
} else if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "dist")));
}

app.get("*", middleware);

// app.get("/", function(req, res) {
// 	res.send(
// 		"You asked for: " +
// 			req.headers["accept-language"] +
// 			"\n" +
// 			"We support: " +
// 			supported +
// 			"\n" +
// 			"Our default is: " +
// 			locale.Locale["default"] +
// 			"\n" +
// 			"The best match is: " +
// 			req.locale +
// 			"\n"
// 	);
// });

app.listen(port, "0.0.0.0", err => {
	if (err) {
		console.error(err);
	} else {
		console.info(`Listening at http://localhost:${port} in ${process.env.NODE_ENV} mode!`);
	}
});
