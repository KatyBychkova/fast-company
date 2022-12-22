import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
import { Router } from "react-router-dom";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import history from "./app/utils/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();
root.render(
    <Router history={history}>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </Router>
);

reportWebVitals();
