import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Router
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";

// Pages 
import App from "./App";
import Login from './pages/login'

// Auth utils
import { getHomeAccountId } from './util/auth'

// Denied access if not exists a sesion
const PrivateRoute = ({ children, ...rest }) => {
  let auth = getHomeAccountId()
  return (
    <Route
      {...rest}
      render={() =>
        auth ? (
          children
        ) : (
          <Redirect
            to="/login"
          />
        )
      }
    />
  );
}

// Avoid show login when user is authenticated
const ProtectedLoginRoute= ({ children, ...rest }) => {
  let auth = getHomeAccountId()
  return (
    <Route
      {...rest}
      render={() =>
        !auth ? (
          children
        ) : (
          <Redirect
            to="/"
          />
        )
      }
    />
  );
}

// Routes
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <App />
        </PrivateRoute>
        <ProtectedLoginRoute exact path="/login">
          <Login />
        </ProtectedLoginRoute>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
