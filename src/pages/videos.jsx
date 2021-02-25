import React from "react";
import { Player } from "video-react";

import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import FileComponent from "../components/file";
import { useState } from "react";

const Videos = () => {
  

  const  fakerVideos = [{_id: "60371bda41ae1b7e6526d746",
     author: "Pepito Pérez",
    name: "login.png",
    path:  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    shared_users:[],
    upload_at: "2021-02-25T03:39:06.955Z",
    weight: 23094
    }, {
      _id: "60371d7e41ae1b7e6526d747",
       author: "Pepito Pérez",
      name: "login.png",
      path:  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
      shared_users:[],
      upload_at: "2021-02-25T03:39:06.955Z",
      weight: 23094
    }]
    

  const [video, setVideo] = useState(fakerVideos[0]);

  const handleDownload = (fileToDownload) => {
    alert("Download: " + fileToDownload.name);
  };
  const handleShared = (fileToShare) => {
    alert("Share: " + fileToShare.name);
  };
  const handleSelecFile = (fileSelected) => {
    setVideo(fileSelected);
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center mt-2">
      <Player
        autoPlay={fakerVideos[0].path !== video.path}
        fluid = {false}
        width = {window.screen.width*0.7}
        height={window.screen.height*0.5}
        playsInline
        poster="/images/video_placeholder.png"
        src={video.path}
      />
      </div>
      <h4 className="my-1 text-center mx-2">{video.name}</h4>
      <p className="text-muted text-center">Play list</p>
      <FileComponent
        files={fakerVideos}
        onDownload={handleDownload}
        onShared={handleShared}
        onSelectedFile={handleSelecFile}
      />
    </>
  );
};

export default WithMessage(WithAppLayout(Videos));
