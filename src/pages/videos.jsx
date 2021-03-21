import React from "react";
import { Player } from "video-react";
import { onSort } from '../util/sort'
import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import FileComponent from "../components/file";
import { useEffect, useState, useContext } from "react";
import { download, removeVideos, listVideos, } from "../services/videoApiService";
import { AppContext } from "../context/AppProvider";

const Videos = () => {


  const [videos, SetVideos] = useState([])
  const [existRequest, setExistRequest] = useState(false);
  const context = useContext(AppContext);
  const reloadFiles = context[8];
  const setReloadFiles = context[9];
  const [loadingVideos, setloadingVideos] = useState(true);
  const [currentVideo, setCurrentVideo] = useState();
  const handleSort = async (typeSort) => {
    const sortFiles = await onSort(typeSort, [...videos])
    SetVideos(sortFiles)
  }



  const handleSelecFile = (fileSelected) => {
    setCurrentVideo(fileSelected);
  };

  function getVideos() {
    setExistRequest(true);
    listVideos()
      .then((res) => {
        const videos = res.data;
        SetVideos(videos);
        setReloadFiles(false);
        if (photos.length != 0) {
          setCurrentVideo(videos[0]);
        } else {
          setCurrentVideo({});
        }
        setExistRequest(false);
        setloadingVideos(false);
      })
      .catch((error) => {
        showMessage(error.message, "error");
        setExistRequest(false);
        setReloadFiles(false);
        setLoadingVideos(false);
      });
  }

  useEffect(() => {
    getVideos();
  }, [reloadFiles]);

  function onDownloadVideos() {
    setExistRequest(true);
    download(currentVideo._id)
      .then((res) => {
        const blob = res.data;
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", currentVideo.name);
        link.click();
        showMessage("Video downloaded!");
        setExistRequest(false);
      })
      .catch((error) => {
        showMessage(error.message, "error");
        setExistRequest(false);
      });
  }

  function onRemoveVideos() {
    setExistRequest(true);
    removeVideos([currentVideo._id])
      .then((response) => {
        showMessage("Video remove");
        setExistRequest(false);
        getVideos();
      })
      .catch((error) => {
        showMessage(error.message, "error");
        setExistRequest(false);
      });
  }



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
          src={currentVideo.path}
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
