import React, { useEffect, useState } from "react";
import "../styles/photos.css";
import ImageGallery from "react-image-gallery";
import WithMessage from "../hocs/withMessage";
import WithAppLayout from "../layouts/appLayout";


const Photos = ({ showMessage }) => {
  const [currentImage, setCurrentImage] = useState({});
  const [countImagesLoadedInCarrousel, setCount] = useState(0)

  // This array should sorted! default by date!
  const [images, setImages] = useState([
    {
      _id: "60371bda41ae1b7e6526d746",
      author: "Pepito Pérez",
      name: "Example image 1.png",
      path: "https://picsum.photos/id/1018/1000/600/",
      shared_users: [],
      upload_at: "2021-02-25T03:39:06.955Z",
      weight: 23094,
    },
    {
      _id: "60371bda41ae1b7e6526d746",
      author: "Pepito Pérez",
      name: "Example image 2.png",
      path: "https://picsum.photos/id/1015/1000/600/",
      shared_users: [],
      upload_at: "2021-02-25T03:39:06.955Z",
      weight: 23094,
    },
    {
      _id: "60371bda41ae1b7e6526d746",
      author: "Pepito Pérez",
      name: "Example image 3.png",
      path: "https://picsum.photos/id/1019/1000/600/",
      shared_users: [],
      upload_at: "2021-02-25T03:39:06.955Z",
      weight: 23094,
    },
    {
      _id: "60371bda41ae1b7e6526d746",
      author: "Pepito Pérez",
      name: "Esta imagen falla porque esta es en mi pc",
      path: "http://localhost:5000/api/photo/603bda662a3ffd370138c8bb/603a7276f310b3ae89a22b8a",
      shared_users: [],
      upload_at: "2021-02-25T03:39:06.955Z",
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
    console.log("onChangeSort:",typeSort);
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
        <button type="button" className="btn btn-outline-danger btn-sm mx-2">
          Remove
        </button>
        <button type="button" className="btn btn-outline-info btn-sm">
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
          autoPlay
        />
        <h4 style={{position:'absolute', top:10}} className="text-bold text-center">
          {currentImage.name?.toUpperCase()}
        </h4>
      </div>
    </div>
  );
};
export default WithMessage(WithAppLayout(Photos));
