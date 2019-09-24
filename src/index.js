import React from "react";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import App from "./components/app";

const history = createBrowserHistory();

render(<App />, document.getElementById("app"));
