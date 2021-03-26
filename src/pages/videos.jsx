import React from "react";
import { Player } from "video-react";
import { onSort } from '../util/sort'
import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import FileComponent from "../components/file";
import { useEffect, useState, useContext, Fragment } from "react";
import { download, removeVideos, listVideos, } from "../services/videoApiService";
import { AppContext } from "../context/AppProvider";

const Videos = ({ showMessage }) => {


  const [videos, SetVideos] = useState([])

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

    listVideos()
      .then((res) => {
        const videos = res.data;
        SetVideos(videos);
        setReloadFiles(false);

        if (videos.length != 0) {
          setCurrentVideo(videos[0]);
        } else {
          setCurrentVideo({});
        }
        setloadingVideos(false);
      })
      .catch((error) => {
        showMessage(error.message, "error");
        setReloadFiles(false);
        setloadingVideos(false);
      });
  }

  useEffect(() => {
    getVideos();
  }, [reloadFiles]);

  return (
    <div>

      <div className="d-flex flex-row justify-content-center mt-2">
        {videos.length !== 0 && (
          <Player
            autoPlay={videos[0].path !== currentVideo.path}
            fluid={false}
            width={window.screen.width * 0.7}
            height={window.screen.height * 0.5}
            playsInline
            poster="/images/video_placeholder.png"
            src={currentVideo.path}
          />
        )}
        {videos.length == 0 && (
          <Player
            fluid={false}
            width={window.screen.width * 0.7}
            height={window.screen.height * 0.5}
            playsInline
            poster="/images/video_placeholder.png"
          />
        )}
      </div>
      {videos.length !== 0 && (
        <Fragment>
          <h4 className="my-1 text-center mx-2">{currentVideo.name}</h4>
          <p className="text-muted text-center">Play list</p>
        </Fragment>
      )
      }


      {videos.length !== 0 && (
        <FileComponent
          loading={loadingVideos}
          files={videos}
          onSelectedFile={handleSelecFile}
          onSort={handleSort}
        />
      )}
    </div>
  );
};

export default WithMessage(WithAppLayout(Videos));
