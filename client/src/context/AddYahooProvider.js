import React, { createContext, useState } from "react";
import { Load } from "../components/Load";
const add_order_model = {
  link: "",
  imgsrc: "",
  username: "",
  maxbid: 0,
  remark: "",
};
const data_link_model = {
  detail: {
    endDate: "",
    startDate: "",
    volumn: "",
  },
  image: [],
  price: "",
  title: "",
};
export const AddYahooContext = createContext();
export const AddYahooProvider = ({ children }) => {
  const [post, setPost] = useState(add_order_model);
  const [data, setData] = useState(data_link_model);
  const [loading, setLoading] = useState(false);
  const FetchImage = async (link) => {
    setLoading(true);
    await fetch("/api/yahoo/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({ link: link }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          console.log(json);
          // alert(json.message);
          setPost({ ...post, imgsrc: json.imgsrc });
          setData(json.data);
        } else {
          alert(json.message);
          if (json.error === "jwt") {
            localStorage.removeItem("token");
          }
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const PostOrder = async (order) => {
    setLoading(true);
    if (order.username === "") {
      return alert("Enter Username");
    } else if (order.maxbid === 0 || order.maxbid === "") {
      return alert("Enter Maxbid");
    }
    await fetch("/api/yahoo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          alert(json.message);
          setPost(add_order_model);
        } else {
          alert(json.message);
          if (json.error === "jwt") {
            localStorage.removeItem("token");
          }
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <AddYahooContext.Provider
      value={{
        FetchImage: FetchImage,
        PostOrder: PostOrder,
        post: post,
        setPost: setPost,
        data: data,
      }}
    >
      {loading && <Load />}
      {children}
    </AddYahooContext.Provider>
  );
};
