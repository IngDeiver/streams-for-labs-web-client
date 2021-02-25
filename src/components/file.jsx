import React from "react";
import "../styles/fileComponent.css";
import moment from 'moment'
import Spinner from './spinner'

const File = ({loading = true, files = [], isSharedSection = false, onDownload, onShared, onSelectedFile}) => {
  
  const getSize = (bytes) => {
    // Megabytes
    const GB = 1000000000 //numero de bytes que tiene 1GB
    if(bytes <=GB ){
      return `${bytes} MB`
    }else{ // Gigabytes
      return `${bytes/GB} GB`
    }
  }

  const formatDate = (date) => {
    const format = "lll"
    const upload_at = moment(date).format(format);
    return moment(upload_at, format).fromNow();
  }
  return (
    <div className="container-fluid">
      <div className="row border py-2 mx-3">
        <div className={`col-${isSharedSection ? "3" : "5"}`}>
          Name <i className="fas fa-caret-down"></i>
        </div>
        <div className="col-2">
          Date <i className="fas fa-caret-down"></i>
        </div>
        <div className="col-2">
          Size <i className="fas fa-caret-down"></i>
        </div>
        {isSharedSection && (
          <div className="col-3">
            Shared from <i className="fas fa-caret-down"></i>
          </div>
        )}
      </div>
      {!loading && files.map((file, key) => (
        <div key={key} className="row mx-3 file container">
          <div onClick={() => onSelectedFile(file)} className={`my-2 col-${isSharedSection ? "3" : "5"}`}>
            <i className="far fa-folder"></i> {file.name.length > 25 ? file.name.substring(0,25) + "...": file.name}
          </div>
          <div onClick={() => onSelectedFile(file)} className="col-2 my-2">{formatDate(file.upload_at)}</div>
          <div onClick={() => onSelectedFile(file)} className="col-2 my-2">{getSize(file.weight)}</div>
          {isSharedSection && 
          <div onClick={() => onSelectedFile(file)} 
            className="col-3 my-2"> 
            {file.author.length > 25 ? file.author.substring(0,25) + "...": file.author}
          </div>}
          <div className={`col-${isSharedSection ? "2" : "3"}`}>
            <div className="d-flex flex-row-reverse ">
              <div className="btn-group dropleft">
                <button
                  type="button"
                  className="btn btn-default dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i style={{fontSize:20}} className="fas fa-chevron-circle-down dropdown show ml-auto"></i>
                </button>
                <div className="dropdown-menu">
                  <a href={file.path}  className="dropdown-item" download>
                    <i className="fas fa-cloud-download-alt"></i> Download
                  </a>
                  {!isSharedSection && 
                    <a className="dropdown-item" href="#" onClick={() => onShared(file)}>
                    <i className="fas fa-share-alt"></i> Share
                  </a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {loading && 
        <div className="d-flex flex-row justify-content-center mt-5">
          <Spinner/>
        </div>
      }
      {!loading && files.length === 0 && 
          <p className="text-center text-muted my-5">Start to share files!</p>
      }
    </div>
  );
};

export default File;
