import React, { useEffect, useState } from 'react';
import '../styles/files.css'
import WithMessage from '../hocs/withMessage';
import WithAppLayout from '../layouts/appLayout'
import FileComponent from "../components/file";
import { getFiles } from '../services/fileApiService'

const Files = ({ showMessage }) => {

    const [files, setFiles] = useState([])
    const [loadingFiles, setLoadingFiles] = useState(true)

    const listFiles = () => {
      getFiles()
      .then((res) => {
        console.log(res.data);
        setLoadingFiles(false);
        setFiles(res.data)
      })
      .catch((err) => {
        console.log(err);
        setLoadingFiles(false);
        showMessage(err.message, "error");
      });
    }

    useEffect(()=> {
      listFiles()
    }, [])

   
    const handleDownload = (fileToDownload) => {
        alert("Download: " + fileToDownload._id)
    };
    const handleShared = (fileToShare) => {
      alert("Share: " + fileToShare.name)
    };
    const handleSelecFile = (fileSelected) => {
      alert("File selected: " + fileSelected.name)

      
    }
    
    return (
      <>
        <FileComponent  
        loading = {loadingFiles}
        files={files} 
        onDownload={handleDownload} 
        onShared={handleShared}
        onSelectedFile={handleSelecFile}/>
      </>
    );

}

export default WithMessage(WithAppLayout(Files))