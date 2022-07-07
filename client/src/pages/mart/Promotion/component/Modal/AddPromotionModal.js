import React, { useState } from "react";
import "./styles.css";
import * as IoIcons from "react-icons/io";
const POST = {
  name: "",
  price: "",
  image: "",
  description: "",
};
const AddPromotionModal = ({ show, onHide }) => {
  const [post, setPost] = useState(POST);
  const [loadingImage, setLoadingImage] = useState(false);
  const handleSelectImage = async (e) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "d2u-service");
    formData.append("cloud_name", "d2u-service");
    await fetch("https://api.cloudinary.com/v1_1/d2u-service/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPost({ ...post, image: data.url });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingImage(false);
      });
  };
  const handleDeleteImage = () => {
    setPost({ ...post, image: "" });
  };
  if (show) {
    return (
      <>
        <div className="backdrop" onClick={onHide} />
        <div className="Modal">
          <div className="Modal-header">
            <h2>
              <IoIcons.IoIosAdd />
              Add Promotion
            </h2>
          </div>
          <div className="Modal-body">
            <div>
              <label>Name</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label>Price</label>
              <input type="number" name="price" />
            </div>
            <div>
              <label>Description</label>
              <textarea name="description"></textarea>
            </div>
            <div>
              <label>image</label>
              <input type="file" name="image" onChange={handleSelectImage} />
              {loadingImage && <>loading...</>}
              {post.image !== "" && (
                <>
                  <img src={post.image} width={200} alt="post_image" />
                  <button onClick={handleDeleteImage}>delete</button>
                </>
              )}
            </div>
          </div>
          <div className="Modal-footer">
            <button>
              <IoIcons.IoIosAdd />
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
};

export const ButtonModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>
        <IoIcons.IoIosAdd />
        <span>Promotion</span>
      </button>
      <AddPromotionModal show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default AddPromotionModal;