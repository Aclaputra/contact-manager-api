import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    {/* render App component which is the main app */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
