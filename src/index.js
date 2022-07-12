import React from "react";
import ReactDOM from "react-dom/client";
//import Users from "./components/users";
import ListOfUsers from "./components/users";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ListOfUsers />
  </React.StrictMode>
);

reportWebVitals();

