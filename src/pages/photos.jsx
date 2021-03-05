import React, { useEffect, useState } from "react";
import "../styles/photos.css";
import ImageGallery from "react-image-gallery";
import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import { download, removePhotos,listPhotos } from "../services/photoApiService";

const Photos = ({ showMessage }) => {
  const [currentImage, setCurrentImage] = useState({});

  // This array should sorted! default by date!
  const [images, setImages] = useState([
    {
      _id: "6041784962923c4c08031226",
      author: "Deiver",
      name: "Photos Solo esta en mi pc xd.png",
      path: "http://localhost:8000/api/photo/download/603c48fa90115aa2a4ab12d4",
      shared_users: [],
      upload_at: "2021-02-27T03:39:06.955Z",
      weight: 23094,
    },
    {
      _id: "60371bda41ae1b7e6526d746",
      author: "Aepito Pérez",
      name: "aExample image 2.png",
      path: "https://picsum.photos/id/1015/1000/600/",
      shared_users: [],
      upload_at: "2010-02-23T03:39:06.955Z",
      weight: 23094,
    },

    {
      _id: "60371bda41ae1b7e6526d746",
      author: "Zepito Pérez",
      name: "zExample image 3.png",
      path: "https://picsum.photos/id/1019/1000/600/",
      shared_users: [],
      upload_at: "2020-02-10T03:39:06.955Z",
      weight: 23094,
    },
    {
      _id: "60371bda41ae1b7e6526d746",
      author: "Bepito Pérez",
      name: "bExample image 3.png",
      path: "https://picsum.photos/id/1019/1000/600/",
      shared_users: [],
      upload_at: "2009-02-30T03:39:06.955Z",
      weight: 23094,
    },

  ]);
  const [existRequest, setExistRequest] = useState(false);

  
  const onSlide = (index) => {
    console.log("onSlide: ", index);
    setCurrentImage(images[index]);
  };

  const onChangeSort = (e) => {
    const typeSort = e.target.value;

    if (typeSort === "date") {
      sortdate();
    }
    if (typeSort === "name") {
      sortname();
    }
    setCurrentImage(images[0]);
  };

  //Ordenar por nombre!
  async function sortname() {
    const imagesname = await images.sort((em1, em2) => {
      return em1.name < em2.name ? -1 : 1;
    });
    console.log(imagesname);
    setImages(imagesname);
  }

  //Ordenar por fecha!
  async function sortdate() {
    const imagesdate = await images.sort((em1, em2) => {
      return new Date(em1.upload_at) - new Date(em2.upload_at);
    });
    console.log(imagesdate);
    setImages(imagesdate);
  }

  function getPhotos(){
    setExistRequest(true);
    listPhotos()
    .then((res)=> {
      const photos= res.data;
      console.log(photos);
      setImages(photos)
      setExistRequest(false);
    })
    .catch((error) => {
      showMessage(error.message, "error");
      setExistRequest(false);
    });
  }
  
 // useEffect(()=> {
 //   getPhotos();
 // }, [])

  useEffect(() => {    
    setCurrentImage(images[0]);
  }, [images]);

  function onDownloadPhotos() {
    setExistRequest(true);
    download(currentImage._id)
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
      })
      .catch((error) => {
        showMessage(error.message, "error");
        setExistRequest(false);
      });
  }

 

  return (
    <div>
      <div className="d-flex flex-row mb-2 mt-3 justify-content-start ml-1">
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
      <div style={{ position: "relative" }}>
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
          <p className="text-muted text-center">Start to share photos!</p>
        )}
        <div className="d-flex justify-content-center">
          <h4
            style={{ position: "absolute", top: 10 }}
            className="text-bold text-center"
          >
            {currentImage.name?.toUpperCase()}
          </h4>
        </div>
        <div className="d-flex justify-content-center">
          <div
            style={{ position: "absolute", bottom: 10 }}
          >
            <button
            onClick={onRemovePhotos}
            //
            type="button"
            disabled={existRequest}
            className="btn btn-outline-danger btn-sm mx-2"
          >
            Remove
          </button>
          <button
            disabled={existRequest}
            onClick={onDownloadPhotos}
            type="button"
            className="btn btn-outline-info btn-sm"
          >
            Download
          </button>
          <button
            disabled={existRequest}
            type="button"
            className="btn btn-outline-success btn-sm ml-2"
          >
            Share
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WithMessage(WithAppLayout(Photos));
