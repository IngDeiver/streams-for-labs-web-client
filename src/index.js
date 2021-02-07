import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap scripts
import 'bootstrap/dist/js/bootstrap.min.js';

// Router
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

// Pages 
import App from "./App";
import Login from './pages/login'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
