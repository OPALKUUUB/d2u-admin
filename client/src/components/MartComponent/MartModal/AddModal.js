import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import Firebase from "../../../Firebase/firebaseConfig";
import Resizer from "react-image-file-resizer";
import "./styles.css";
const POST = {
  code: "",
  name: "",
  category: "",
  price: "",
  expire_date: "",
  image: "",
  description: "",
};
const AddModal = ({ show, onHide, shop }) => {
  const [post, setPost] = useState(POST);
  const [loadingImage, setLoadingImage] = useState(false);
  const handleChange = (e) => {
    setPost((prev) => ({ ...post, [e.target.name]: e.target.value }));
  };

  function handleSelectImage(event) {
    var fileInput = false;
    setLoadingImage(true);
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          600,
          600,
          "JPEG",
          150,
          0,
          (uri) => {
            setPost({ ...post, image: uri });
            setLoadingImage(false);
          },
          "Blob"
        );
      } catch (err) {
        console.log(err);
        setLoadingImage(false);
      }
    }
  }

  const handleDeleteImage = () => {
    setPost({ ...post, image: "" });
  };
  const handleSubmit = async () => {
    // POST post
    let date = new Date();
    // await axios
    //   .post(`https://upsert-api-by-class.herokuapp.com/upsert/${shop}`, {
    //     ...post,
    //     code: date.getTime(),
    //   })
    //   .finally(() => {
    //     alert("add order success👍");
    //     onHide();
    //   });
    console.log(post);
    await Firebase.database()
      .ref(`/${shop}/${date.getTime()}`)
      .set(
        {
          name: post.name,
          price: post.price,
          expire_date: post.expire_date,
          category: post.category,
          image: post.image,
          description: post.description,
        },
        (err) => {
          if (err) {
            alert("update order fail👎");
          } else {
            alert("add order success👍");
            onHide();
          }
        }
      );
    setPost(POST);
  };
  if (show) {
    return (
      <>
        <div
          className="backdrop"
          onClick={onHide}
          onScroll={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            className="Modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="Modal-header">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "24px",
                }}
              >
                <IoIcons.IoIosAdd />
                {`Add ${shop === "promotion" ? "Promotion" : "Product"}`}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "28px", cursor: "pointer" }}
                className="h-2 w-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={onHide}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="Modal-body">
              <div className="Modal-label-input">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={post.name}
                  onChange={handleChange}
                />
              </div>
              <div className="Modal-label-input">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={post.category}
                  onChange={handleChange}
                />
              </div>
              <div className="Modal-label-input">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={post.price}
                  onChange={handleChange}
                />
              </div>
              <div className="Modal-label-input">
                <label>Expire Date</label>
                <input
                  type="date"
                  name="expire_date"
                  value={post.expire_date}
                  onChange={handleChange}
                />
              </div>
              <div className="Modal-label-input">
                <label>Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  value={post.description}
                  rows={3}
                ></textarea>
              </div>
              <div className="Modal-label-image">
                <label>Image</label>

                <label for="image" className="Modal-label-image-upload">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  onChange={handleSelectImage}
                  style={{ display: "none" }}
                />

                <div className="Modal-label-image-container">
                  {loadingImage && <>Loading Image...</>}
                  {post.image !== "" && (
                    <>
                      <img src={post.image} width={200} alt="post_image" />
                      <button onClick={handleDeleteImage}>Remove Image</button>
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
          </div>
        </div>
      </>
    );
  }
};

export const ButtonModal = ({ shop }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="btn-lg btn-primary "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "7px",
          width: "200px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <IoIcons.IoIosAdd />
        <span>{shop === "promotion" ? "Add Promotion" : "Add Product"}</span>
      </button>
      <AddModal show={show} onHide={() => setShow(false)} shop={shop} />
    </>
  );
};

export default AddModal;
