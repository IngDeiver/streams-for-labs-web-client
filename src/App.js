import WithMessage from "./hocs/withMessage";
import React, { useEffect } from "react";
import { useState } from "react";

// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Pages
import Login from "./pages/login";
import Admin from "./pages/admin";

// Auth utils
import { getLocalSesion } from "./util/auth";


// Denied access if not exists a sesion as user
const PrivateRoute = ({ children, sesion, loadingSesion, ...rest }) => {
  // Loading sesion
  if (loadingSesion) return <Route {...rest} render={() => <div>Loading...</div>} />;

  // If not exist  sesion
  if (!sesion && !loadingSesion)
    return <Route {...rest} render={() => <Redirect to="/login" />} />;

  /* Avoid user enter into admin page
     and avoid admin enter into user pages
  */
  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log(location)
        if (location.pathname === "/administration" && sesion.role !== "ADMIN")
          return <Redirect to="/login"/>;
        else if (location.pathname !== "/administration" && sesion.role === "ADMIN")
          return <Redirect to="/login"/>;
        else return children;
      }}
    />
  );
};

// Denied load login page when exist a sesion
const ProtectedAccessLoginRoute = ({ children, sesion, loadingSesion,...rest }) => {
  // Loading sesion
  if (loadingSesion) return <Route {...rest} render={() => <div>Loading...</div>} />;

  // If  exist  sesion redict to initial page
  if (sesion) return <Route {...rest} render={() => {
    if (sesion.role === "ADMIN")
      return <Redirect to="/administration"/>;
    else return  <Redirect to="/"/>;
  } }/>;

  else if (!sesion && !loadingSesion) return <Route {...rest} render={() => children} />
}

function App({showMessage}) {
  const [sesion, setSesion] = useState(null);
  const [loadingSesion, setLoadingSesion] = useState(true);

  useEffect(() => {
    getLocalSesion()
      .then((auth) => {
        console.log("Sesion loaded ->", auth);
        setSesion(auth);
        setLoadingSesion(false);
      })
      .catch(() => showMessage("Invalid sesión", "error"));
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <PrivateRoute
            sesion={sesion}
            loadingSesion={loadingSesion}
            exact
            path="/"
          >
            <div>Here the initial page</div>
          </PrivateRoute>

          <PrivateRoute
            sesion={sesion}
            loadingSesion={loadingSesion}
            exact
            path="/administration"
          >
            <Admin />
          </PrivateRoute>

          <ProtectedAccessLoginRoute 
            sesion={sesion}
            loadingSesion={loadingSesion} exact path="/login">
            <Login />
          </ProtectedAccessLoginRoute>

        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default WithMessage(App);
