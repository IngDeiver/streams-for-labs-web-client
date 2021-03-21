import React, { useState } from "react";
import "../styles/shared.css";
import { onSort } from '../util/sort'
import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import FileComponent from "../components/file";

const Shared = () => {
  const  [sharedFiles, setSharedFiles ]= useState([
  {
    _id: "6057996135d7e2337fd5966b",
    author: "Pepito Pérez",
    name: "Galaxy.jpg",
    path: "public/photos/login.png-1614224346932-login.png",
    shared_users:[],
    upload_at: "2021-02-25T03:39:06.955Z",
    weight: 23094
  }, {
    _id: "60579071ada6c824380f7a90",
    author: "Pepito Pérez",
    name: "Archivo.pdf",
    path: "public/files/login.png-1614224766287-login.png",
    shared_users:[],
    upload_at: "2021-02-25T03:39:06.955Z",
    weight: 23094
  }])
  
  
    const handleSort = async  (typeSort) => {
      const sortFiles = await onSort(typeSort, [...sharedFiles])
      setSharedFiles(sortFiles)
    }
  
  
  return (
    <>
      <FileComponent 
      loading={false}
      files={sharedFiles}
      onSort={handleSort}
      isSharedSection/>
    </>
  );
};

export default WithMessage(WithAppLayout(Shared));
