require("turbolinks").start();
import React from "react";
import ReactDOM from "react-dom";
import App from "../src/App";
// import PropTypes from 'prop-types'

document.addEventListener("DOMContentLoaded", () => {
  //   ReactDOM.render(<App />, document.getElementById("root"));
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
