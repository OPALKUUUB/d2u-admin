import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";

import "./styles.css";
import axios from "axios";
import Firebase from "../../Firebase/firebaseConfig";

function ManageModal({ show, onHide, order, shop }) {
  const [post, setPost] = useState(order);
  const [loadingImage, setLoadingImage] = useState(false);
  const handleChange = (e) => {
    setPost((prev) => ({ ...post, [e.target.name]: e.target.value }));
  };
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
  const handleSubmit = async () => {
    // POST post
    // await axios
    // .post(`http://upsert-api-by-class.herokuapp.com/upsert/${shop}`, post)
    // .catch((err) => console.log(err));
    // console.log(post);
    // setPost(POST);
    console.log(shop);
    await Firebase.database().ref(`/${shop}/${post.code}`).update({
      name: post.name,
      price: post.price,
      category: post.category,
      image: post.image,
      description: post.description,
    });
  };
  if (show) {
    return (
      <>
        <div className="backdrop" onClick={onHide} />
        <div className="Modal">
          <div className="Modal-header">
            <h2>
              <BsIcons.BsFillGearFill />
              Manage Promotion
            </h2>
          </div>
          <div className="Modal-body">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={post.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={post.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={parseFloat(post.price).toFixed(2)}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={post.description}
              ></textarea>
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
            <button onClick={handleSubmit}>
              <IoIcons.IoIosAdd />
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
}

export const ButtonModal = ({ order, shop }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>
        <span>Manage</span>
      </button>
      <ManageModal
        show={show}
        onHide={() => setShow(false)}
        order={order}
        shop={shop}
      />
    </>
  );
};

export default ManageModal;
