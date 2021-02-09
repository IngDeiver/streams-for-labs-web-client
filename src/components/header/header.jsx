/* eslint-disable jsx-a11y/anchor-is-valid */
import react, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthConext } from "../../context/AuthProvider";
import { logout } from "../../util/auth";

const Header = (props) => {
  // Get username from auth context 
  const context = useContext(AuthConext)
  const { username } = context[2]

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Logo
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="files">
                  All files
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/photos">
                  Photos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/videos">
                  Videos
                </Link>
              </li>
              <li className="nav-item dropdown ml-auto">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {username}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <button onClick={logout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
