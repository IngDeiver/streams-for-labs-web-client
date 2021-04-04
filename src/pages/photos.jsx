import React, { useEffect, useState, useContext } from "react";
import "../styles/photos.css";
import ImageGallery from "react-image-gallery";
import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import {
  downloadPhoto,
  removePhotos,
  listPhotos,
} from "../services/photoApiService";
import { AppContext } from "../context/AppProvider";
import Spinner from "../components/spinner";
import { onSort } from "../util/sort";

const Photos = ({ showMessage }) => {
  const [currentImage, setCurrentImage] = useState({});

  // This array should sorted! default by date!
  const [images, setImages] = useState([]);
  const [existRequest, setExistRequest] = useState(false);
  const context = useContext(AppContext);
  const reloadFiles = context[8];
  const setReloadFiles = context[9];
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  const onSlide = (index) => {
    console.log("onSlide: ", index);
    setCurrentImage(images[index]);
  };

  const onChangeSort = async (e) => {
    const typeSort = e.target.value;
    const photosSorted = await onSort(typeSort, [...images]);
    setImages(photosSorted);
    setCurrentImage(photosSorted[0]);
  };

  function getPhotos() {
    setExistRequest(true);
    listPhotos()
      .then((res) => {
        const photos = res.data;
        setImages(photos);
        setReloadFiles(false);
        if (photos.length != 0) {
          setCurrentImage(photos[0]);
        } else {
          setCurrentImage({});
        }
        setExistRequest(false);
        setLoadingPhotos(false);
      })
      .catch((error) => {
        showMessage(error.message, "error");
        setExistRequest(false);
        setReloadFiles(false);
        setLoadingPhotos(false);
      });
  }

  useEffect(() => {
    getPhotos();
  }, [reloadFiles]);

  function onDownloadPhotos() {
    setExistRequest(true);
    showMessage("Download started");
    downloadPhoto(currentImage._id)
      .then((res) => {
        const blob = res.data;
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", currentImage.name);
        link.click();
        showMessage("Photo downloaded!");
        setExistRequest(false);
      })
      .catch((error) => {
        showMessage(error.message, "error");
        setExistRequest(false);
      });
  }

  function onRemovePhotos() {
    setExistRequest(true);
    removePhotos([currentImage._id])
      .then((response) => {
        showMessage("Photo remove");
        setExistRequest(false);
        getPhotos();
      })
      .catch((error) => {
        showMessage(error.message, "error");
        setExistRequest(false);
      });
  }

  return (
    <div>
      {images.length !== 0 && (
        <>
          <div className="d-flex flex-row mb-2 mt-3 justify-content-start ">
            <select
              style={{ width: "20%" }}
              className="custom-select custom-select-sm"
              onChange={onChangeSort}
            >
              <option selected>Select a sort</option>
              <option value="date">By date</option>
              <option value="name">By name</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <h4 className="ml-2 text-muted">{currentImage?.name?.toUpperCase()}</h4>
          </div>
        </>
      )}
      <div style={{ position: "relative" }}>
        {loadingPhotos && (
          <div className="d-flex flex-row justify-content-center mt-5">
            <Spinner />
          </div>
        )}
        {images.length > 0 ? (
          <ImageGallery
            items={images.map((img) => {
              const path = `${process.env.REACT_APP_GATEWAY_SERVICE_BASE_URL}/api/photo/download/${img._id}`;
              return {
                original: path,
                thumbnail: path,
              };
            })}
            onSlide={onSlide}
            onBeforeSlide={onSlide}
            thumbnailPosition="left"
            lazyLoad
            showFullscreenButton={false}
            showPlayButton={false}
          />
        ) : (
          <>
            {!loadingPhotos && (
              <p className="text-muted text-center mt-5">
                Start to share photos!
              </p>
            )}
          </>
        )}

        {images.length !== 0 && (
          <div className="d-flex justify-content-center">
            <div style={{ position: "absolute", bottom: 10 }}>
              <button
                onClick={onRemovePhotos}
                // Hacemos un boton para remover la imagen
                type="button"
                disabled={existRequest}
                className="btn btn-danger btn-sm mx-2"
              >
                Remove
              </button>
              <button
                disabled={existRequest}
                onClick={onDownloadPhotos}
                // Hacemos un boton para descargar la imagen
                type="button"
                className="btn btn-info btn-sm"
              >
                Download
              </button>
              <button
                disabled={existRequest}
                // Hacemos un boton para compartir la imagen
                type="button"
                className="btn btn-success btn-sm ml-2"
              >
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default WithMessage(WithAppLayout(Photos));
