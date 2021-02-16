import React from "react";
import "../styles/fileComponent.css";

const File = ({ files = [], shared = false, onDownload, onShared }) => {
  return (
    <div className="container-fluid">
      <div className="row border py-2 mx-3">
        <div className={`col-${shared ? "3" : "5"}`}>
          Name <i className="fas fa-caret-down"></i>
        </div>
        <div className="col-2">
          Date <i className="fas fa-caret-down"></i>
        </div>
        <div className="col-2">
          Size <i className="fas fa-caret-down"></i>
        </div>
        {shared && (
          <div className="col-3">
            Shared from <i className="fas fa-caret-down"></i>
          </div>
        )}
      </div>
      {files.map((file, key) => (
        <div key={key} className="row mx-3 file container">
          <div className={`my-2 col-${shared ? "3" : "5"}`}>
            <i className="far fa-folder"></i> {file.name.length > 25 ? file.name.substring(0,25) + "...": file.name}
          </div>
          <div className="col-2 my-2">{file.date}</div>
          <div className="col-2 my-2">{file.size}</div>
          {shared && <div className="col-3 my-2"> {file.from.length > 25 ? file.from.substring(0,25) + "...": file.from}</div>}
          <div className={`col-${shared ? "2" : "3"}`}>
            <div className="d-flex flex-row-reverse ">
              <div className="btn-group dropleft">
                <button
                  type="button"
                  className="btn btn-default dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-chevron-circle-down dropdown show ml-auto"></i>
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#" onClick={() => onDownload(file)}>
                    <i className="fas fa-cloud-download-alt"></i> Download
                  </a>
                  {shared && 
                    <a className="dropdown-item" href="#" onClick={() => onShared(file)}>
                    <i className="fas fa-share-alt"></i> Share
                  </a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {files.length === 0 && 
          <p className="text-center text-muted my-5">Start to share files!</p>
      }
    </div>
  );
};

export default File;
