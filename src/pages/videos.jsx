import React from "react";
import { Player } from "video-react";
import { onSort } from "../util/sort";
import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import FileComponent from "../components/file";
import { useState } from "react";

const Videos = () => {
  const VIDEO_API = 'api/video/download'

  const [videos, SetVideos] = useState([
    {
      _id: "6058d73921ad3f3d40062bce",
      author: "Pepito Pérez",
      name: "Video.mp4",
      path:"/home/streams-for-lab.co/deiver-guerra-carrascal/videos/Video.mp4",
      shared_users: [],
      upload_at: "2022-02-25T03:39:06.955Z",
      weight: 23094,
    },
    {
      _id: "",
      author: "Julanito",
      name: "Video2.pm4",
      path:"",
      shared_users: [],
      upload_at: "2021-02-25T03:39:06.955Z",
      weight: 23094,
    },
  ]);

  const handleSort = async (typeSort) => {
    const sortFiles = await onSort(typeSort, [...videos]);
    SetVideos(sortFiles);
  };

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  const handleSelecFile = (fileSelected) => {
    setCurrentVideo(fileSelected);
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center mt-2">
        <Player
          autoPlay={videos[0].path !== currentVideo.path}
          fluid={false}
          width={window.screen.width * 0.7}
          height={window.screen.height * 0.5}
          playsInline
          poster="/images/video_placeholder.png"
          src={`${process.env.REACT_APP_GATEWAY_SERVICE_BASE_URL}/${VIDEO_API}/${currentVideo._id}`}
        />
      </div>
      <h4 className="my-1 text-center mx-2">{currentVideo.name}</h4>
      <p className="text-muted text-center">Play list</p>
      <FileComponent
        loading={false}
        files={videos}
        onSelectedFile={handleSelecFile}
        onSort={handleSort}
      />
    </>
  );
};

export default WithMessage(WithAppLayout(Videos));
