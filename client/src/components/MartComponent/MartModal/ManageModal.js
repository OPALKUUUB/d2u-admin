import React, { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import "./styles.css";
import axios from "axios";
import Firebase from "../../../Firebase/firebaseConfig";
import Resizer from "react-image-file-resizer";
import Select from "react-select";
import Options from "./Options";

function ManageModal({ show, onHide, order, shop }) {
  const [post, setPost] = useState(order);
  const [loadingImage, setLoadingImage] = useState(false);
  const [checkExpireDate, setCheckExpireDate] = useState(false);
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
    // await axios
    //   .post(`https://upsert-api-by-class.herokuapp.com/upsert/${shop}`, post)
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     onHide();
    //   });
    // console.log(post);
    // setPost(POST);
    // console.log(shop);
    // console.log(post);
    await Firebase.database()
      .ref(`/${shop}/${post.code}`)
      .update(
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
            // console.log("error");
            alert("update order fail👎");
          } else {
            alert("update order success👍");
          }
        }
      );
  };
  const handleSelectCategory = (value) => {
    setPost((prev) => ({ ...prev, category: value }));
  };

  useEffect(() => {
    setPost(order);
    if (
      /\d{4}-\d{2}-\d{2}/.test(order.expire_date) ||
      order.expire_date === ""
    ) {
      setCheckExpireDate(false);
    } else {
      setCheckExpireDate(true);
    }
    // console.log(order);
  }, [order]);

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
                <BsIcons.BsFillGearFill />
                {`Manage ${shop === "promotion" ? "Promotion" : "Product"}`}
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
                {typeof post.category === "object" ? (
                  <Select
                    options={Options}
                    isMulti
                    value={post.category}
                    onChange={handleSelectCategory}
                  />
                ) : (
                  <input
                    type="text"
                    name="category"
                    value={post.category}
                    onChange={handleChange}
                  />
                )}
              </div>
              <div className="Modal-label-input">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={parseFloat(post.price).toFixed(2)}
                  onChange={handleChange}
                />
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  checked={checkExpireDate}
                  onChange={(e) => {
                    setCheckExpireDate(e.target.checked);
                    if (e.target.checked) {
                      setPost((prev) => ({
                        ...prev,
                        expire_date: "หมดอายุไม่น้อยกว่า 3 เดือน",
                      }));
                    } else {
                      setPost((prev) => ({
                        ...prev,
                        expire_date: "",
                      }));
                    }
                  }}
                />{" "}
                <label>หมดอายุไม่น้อยกว่า 3 เดือน</label>
              </div>
              {!checkExpireDate && (
                <div className="Modal-label-input">
                  <label>Expire Date</label>
                  <input
                    type="date"
                    name="expire_date"
                    value={post.expire_date}
                    onChange={handleChange}
                  />
                </div>
              )}
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
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const ButtonModal = ({ order, shop }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(true);
    console.log(order);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="btn-sm btn-success"
        style={{ width: "80px" }}
      >
        <span>Manage</span>
      </button>
      <ManageModal
        show={show}
        onHide={() => setShow(false)}
        order={order}
        shop={shop}
      />
    </div>
  );
};

export default ManageModal;
