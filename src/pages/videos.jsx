import React from 'react';
import { Player } from 'video-react';

import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import FileComponent from "../components/file";
import {useState} from 'react';

const Videos = () => {
    
const [video, setVideo] = useState({name: "A video file #1", date:"14/07/2021", from: "Pepito Peréz", size: "10MB", path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"});


  const  fakerVideos = [{name: "A video file #1", date:"14/07/2021", from: "Pepito Peréz", size: "10MB", path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"},
  {name: "A video file #2", date:"14/07/2021", from: "Juan Peréz", size: "1GB", path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"},
  {name: "A video file #3", date:"03/05/2021", from: "Carlos Peréz", size: "8MB", path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"},
  {name: "A video file #4", date:"21/2/2020", from: "Karol Peréz", size: "2MB", path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}]

const handleDownload = (fileToDownload) => {
    alert("Download: " + fileToDownload.name)
};
const handleShared = (fileToShare) => {
  alert("Share: " + fileToShare.name)
};
const handleSelecFile = (fileSelected) => {
    setVideo(fileSelected) 
       
}
    
    return (
        <>
        <Player playsInline poster="/images/video_placeholder.png" src={video.path}  />            
        <h4 className="my-1">{video.name}</h4>   
        <p className="text-muted">{video.date}</p>   
        <FileComponent files={fakerVideos} 
        onDownload={handleDownload} 
        onShared={handleShared}
        onSelectedFile={handleSelecFile}/>  
        </>
    )
}

export default WithMessage(WithAppLayout(Videos))