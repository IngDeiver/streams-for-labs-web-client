/* eslint-disable jsx-a11y/anchor-is-valid */
import react from "react";
import { logout } from "../util/auth";

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid d-flex flex-row-reverse">
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-outline-secondary" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className="d-flex flex-row">
          <a className="navbar-brand" href="/">
            <i className="fas fa-database" style={{color: "#48dbfb", fontSize: 30}}></i>
          </a>
          <span >
            <h5 className="pt-2">Streams for lab</h5>
          </span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
