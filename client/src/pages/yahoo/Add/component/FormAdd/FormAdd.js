import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AddYahooContext } from "../../../../../context/AddYahooProvider";

export const FormAdd = () => {
  const { FetchImage, PostOrder, post, setPost, data } =
    useContext(AddYahooContext);
  const [link, setLink] = useState("");
  const handleSearch = () => {
    FetchImage(link);
  };
  const handleChangePost = (e) => {
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-10">
          <input
            type="text"
            name="link"
            className="form-control"
            value={link}
            placeholder="Enter Yahoo Link https://page.auctions.yahoo.co.jp/auction/x0000000"
            onChange={(e) => {
              setLink(e.target.value);
              setPost({ ...post, link: e.target.value });
            }}
          />
        </div>
        <div className="col">
          <button
            type="button"
            onClick={handleSearch}
            className="btn btn-primary w-100"
          >
            Search
          </button>
        </div>
      </div>
      {post.imgsrc !== "" && (
        <>
          <div className="row mb-3">
            <div className="col-4">
              <label className="form-label">username</label>
              <AutoComplete
                state={post.username}
                setState={(value) => setPost({ ...post, username: value })}
              >
                <input
                  type="text"
                  name="username"
                  value={post.username}
                  onChange={handleChangePost}
                  className="form-control"
                />
              </AutoComplete>
            </div>
            <div className="col-4">
              <label className="form-label">Maxbid</label>
              <input
                type="number"
                name="maxbid"
                value={post.maxbid}
                onChange={handleChangePost}
                className="form-control"
              />
            </div>
            <div className="col-4">
              <label className="form-label">Remark</label>
              <input
                type="text"
                name="remark"
                value={post.remark}
                onChange={handleChangePost}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <img src={post.imgsrc} alt={post.imgsrc} width={300} />
            </div>
            <div className="col-sm-12 col-md-8">
              <h5>{data.title}</h5>
              <p>
                startDate: {data.detail.startDate}
                <br />
                endDate: {data.detail.endDate}
                <br />
                volumn: {data.detail.volumn}
                <br />
                price: {data.price}
                <br />
              </p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-success"
                  onClick={() => PostOrder(post)}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AutoCompleteBox = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 100px;
  overflow-y: scroll;
`;

const AutoCompleteItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
function AutoComplete({ children, state, setState }) {
  const [users, setUsers] = useState([{}]);
  const [lastState, setLastState] = useState("");

  useEffect(() => {
    fetch("/api/overview/users/autocomplete", init())
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          setUsers(json.data);
        } else {
          alert(json.message);
        }
      });
  }, []);
  return (
    <div>
      {children}
      <div
        style={{
          position: "relative",
        }}
      >
        <AutoCompleteBox>
          {state !== lastState &&
            users
              .filter((user) =>
                user.username.toLowerCase().includes(state.toLowerCase())
              )
              .map((item) => (
                <AutoCompleteItem
                  style={{ padding: "10px 20px" }}
                  key={item.id}
                  onClick={() => {
                    setLastState(item.username);
                    setState(item.username);
                  }}
                >
                  {item.username}
                </AutoCompleteItem>
              ))}
        </AutoCompleteBox>
      </div>
    </div>
  );
}

function init() {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("token")).token
      }`,
    },
  };
}
