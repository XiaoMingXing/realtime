import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./scripts/App";
import registerServiceWorker from "./registerServiceWorker";
import {BrowserRouter} from "react-router-dom";

/*basename="/app"*/
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
