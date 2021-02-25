/* eslint-disable jsx-a11y/anchor-is-valid */
import react, { useState } from "react";
import { logout } from "../util/auth";
import "../styles/header.css";
import { upload } from "../services/fileApiService";
import withMessage from "../hocs/withMessage";

const Header = ({ noIsAdminSection = true, showMessage }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("0%");

  const onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(percentCompleted);
    setProgress(`${percentCompleted}%`);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProgress("0%");
      setUploading(true);
      console.log(file.name);

      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      upload(formData, onUploadProgress)
        .then((res) => {
          console.log(res);
          setUploading(false);
          showMessage("File uploaded!");
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
          showMessage(err.message, "error");
        });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid d-flex flex-row-reverse">
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {noIsAdminSection && (
              <li className="nav-item mr-2">
                <form>
                  <input
                    disabled={uploading}
                    onChange={handleFile}
                    name="file"
                    type="file"
                    id="file"
                    className="inputfile"
                  />
                  {uploading ? (
                    <p className="mt-2 mr-2">{progress}</p>
                  ) : (
                    <label for="file">
                      <i className="fas fa-file-upload"></i> Upload
                    </label>
                  )}
                </form>
              </li>
            )}
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
              <i
                className="fas fa-database"
                style={{ color: "#48dbfb", fontSize: 30 }}
              ></i>
            </a>
            <span>
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

export default withMessage(Header);
