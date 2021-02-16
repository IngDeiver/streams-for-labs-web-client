import React from "react";
import "../styles/shared.css";

import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import FileComponent from "../components/file";

const Shared = () => {
  const  fakerFiles = [{name: "A name file #1", date:"14/07/2021", from: "Pepito Peréz", size: "10MB"},
  {name: "A name file #2", date:"14/07/2021", from: "Juan Peréz", size: "1GB"},
  {name: "A name file #3", date:"03/05/2021", from: "Carlos Peréz", size: "8MB"},
  {name: "A name file #4", date:"21/2/2020", from: "Karol Peréz", size: "2MB"}]
  const handleDownload = (fileToDownload) => {
      alert("Download: " + fileToDownload.name)
  };
  const handleShared = (fileToShare) => {
    alert("Share: " + fileToShare.name)
  };
  return (
    <>
      <FileComponent shared files={fakerFiles} onDownload={handleDownload} onShared={handleShared} />
    </>
  );
};

export default WithMessage(WithAppLayout(Shared));
