import React from 'react';
import '../styles/files.css'
import WithMessage from '../hocs/withMessage';
import WithAppLayout from '../layouts/appLayout'
import FileComponent from "../components/file";

const Files = () => {
    const  fakerFiles = [{name: "Archivo #1", date:"14/02/2021", size: "10MB"},
    {name: "Archivo #2", date:"14/02/2021",  size: "100MB"},
    {name: "Archivo #3", date:"14/02/2021",  size: "150MB"},
    {name: "Archivo #4", date:"14/02/2021",  size: "300MB"},
    {name: "Archivo #5", date:"17/02/2021",  size: "900MB"}]
    
    const handleDownload = (fileToDownload) => {
        alert("Download: " + fileToDownload.name)
    };
    const handleShared = (fileToShare) => {
      alert("Share: " + fileToShare.name)
    };
    const handleSelecFile = (fileSelected) => {
      alert("File selected: " + fileSelected.name)

      
    }
    
    return (
      <>
        <FileComponent  files={fakerFiles} 
        onDownload={handleDownload} 
        onShared={handleShared}
        onSelectedFile={handleSelecFile}/>
      </>
    );

}

export default WithMessage(WithAppLayout(Files))