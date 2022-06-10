import React, { useState } from "react";
import { Card, Layout } from "../styles/MartStyles";

export const AddMart = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Layout>
      <Card>
        <form>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-5">
              <input className="form-control" name="name" type="text" />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Image</label>
            <div className="col-sm-5">
              <input
                className="form-control"
                name="image"
                type="file"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-5">
              <textarea
                className="form-control"
                name="description"
                type="text"
              ></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-2">
              <select className="form-select">
                <option>cat1</option>
                <option>cat2</option>
                <option>cat3</option>
                <option>cat4</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Tag</label>
            <div className="col-sm-2">
              <select className="form-select">
                <option>tag1</option>
                <option>tag2</option>
                <option>tag3</option>
                <option>tag4</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-start mt-3">
            <button className="btn btn-success">+ Add</button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};
