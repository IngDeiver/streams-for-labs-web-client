import React, { useEffect, useState } from "react";
import "../styles/photos.css";
import ImageGallery from "react-image-gallery";
import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";
import { download, removePhotos } from '../services/photoApiService';


const Photos = ({ showMessage }) => {
  const [currentImage, setCurrentImage] = useState({});
  const [countImagesLoadedInCarrousel, setCount] = useState(0)

  // This array should sorted! default by date!
  const [images, setImages] = useState([
    {
      _id: "603c48fa90115aa2a4ab12d4",
      author: "Photos test xd",
      name: "Photos.png",
      path: "https://picsum.photos/id/1018/1000/600/",
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

  const onSlide = (index) => {
    console.log("onSlide: ", index);
    setCurrentImage(images[index]);
  };


  const onImageLoad = (e) => {
    setCount(countImagesLoadedInCarrousel+1)
  }
  
  const onChangeSort = (e) => {
    const typeSort =  e.target.value
    
    if (typeSort === 'date') {
      sortdate()
    }
    if (typeSort === 'name') {
      sortname()
    }
    setCurrentImage(images[0])
  }

  //Ordenar por nombre!
  async function  sortname (){
    
    const imagesname = await images.sort((em1, em2) => {
      return (em1.name < em2.name) ? -1 : 1
    })
    console.log(imagesname);
    setImages(imagesname)

  }

   //Ordenar por fecha!
  async function sortdate (){
   
    const imagesdate = await images.sort((em1, em2) => {
      return new Date(em1.upload_at) - new Date(em2.upload_at)
    })
    console.log(imagesdate);
    setImages(imagesdate)
  }

  function onDownloadPhotos() {
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
     }).catch((error) => {
        showMessage(error.message, "error")
     })
  }

  function onRemovePhotos() {
    removePhotos([currentImage._id])
    .then((response) => {
      showMessage('Photo remove')
   }).catch((error) => {
      showMessage(error.message, "error")
   })
  }

  useEffect(() => {
    setCurrentImage(images[0]);
  }, [images]);

  return (
    <div>
      <div className="d-flex flex-row justify-content-center my-2">
        <select className="custom-select custom-select-sm w-50"
          onChange={onChangeSort}>
          <option selected>Select a sort</option>
          <option value="date">By date</option>
          <option value="name">By name</option>
        </select>
        <button onClick={onRemovePhotos}
        type="button" className="btn btn-outline-danger btn-sm mx-2">
          Remove
        </button>
        <button onClick={onDownloadPhotos}
        type="button" className="btn btn-outline-info btn-sm">
          Download
        </button>
      </div>
      <div style={{position:'relative'}} className="d-flex flex-row justify-content-center">
        <ImageGallery
          items={images.map((img) => ({
            original: img.path,
            thumbnail: img.path
          }))}
          onSlide={onSlide}
          onBeforeSlide={onSlide}
          onImageLoad={onImageLoad}
          thumbnailPosition="left"
          lazyLoad={true}
          //autoPlay
        />
        <h4 style={{position:'absolute', top:10}} className="text-bold text-center">
          {currentImage.name?.toUpperCase()}
        </h4>
      </div>
    </div>
  );
};
export default WithMessage(WithAppLayout(Photos));
