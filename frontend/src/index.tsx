import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "./Styles/main.css";

const options = {
  timeout: 4000,
  position: positions.TOP_CENTER,
  containerStyle: {
    zIndex: 999,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Provider template={AlertTemplate} {...options}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
