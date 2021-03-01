import React, { useContext, useEffect, useState } from 'react';
import '../styles/files.css'
import WithMessage from '../hocs/withMessage';
import WithAppLayout from '../layouts/appLayout'
import FileComponent from "../components/file";
import { getFiles } from '../services/fileApiService'
import { AppContext } from '../context/AppProvider';

const Files = ({ showMessage }) => {

    const [files, setFiles] = useState([])
    const [loadingFiles, setLoadingFiles] = useState(true)
    const context = useContext(AppContext)
    const reloadFiles = context[8]
    const setReloadFiles = context[9]

    const listFiles = () => {
      getFiles()
      .then((res) => {
        setLoadingFiles(false);
        setFiles(res.data)
        setReloadFiles(false)
      })
      .catch((err) => {
        console.log(err);
        setLoadingFiles(false);
        showMessage(err.message, "error");
        setReloadFiles(false)
      });
    }

    useEffect(()=> {
      listFiles()
    }, [reloadFiles])

   
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