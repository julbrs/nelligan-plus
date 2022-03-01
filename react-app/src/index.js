import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./components/App";
import { Amplify } from "aws-amplify";
import config from "./amplify";

Amplify.configure(config);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
