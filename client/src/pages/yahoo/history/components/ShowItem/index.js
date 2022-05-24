import React, { useContext, useEffect, useState } from "react";
import { ShowItemContext, ShowItemProvider } from "./context/ShowItemProvider";

export const ShowItem = () => {
  return (
    <ShowItemProvider>
      <div className="container">
        <Head />
        {/* body */}
        <Body />

        {/* point */}
      </div>
    </ShowItemProvider>
  );
};

const Head = () => {
  const { data } = useContext(ShowItemContext);
  return (
    <div>
      <p>
        Date: {data.created_at}
        <br />
        Username: {data.username}
        <br />
        link: {data.link}
        <br />
        img: <img src={data.imgsrc} alt={data.imgsrc} width={100} />
        <br />
        Price:{data.price}
        <br />
        slip: {data.slip}
      </p>
    </div>
  );
};

const Body = () => {
  const { data, handleChange } = useContext(ShowItemContext);
  const [post, setPost] = useState(data);
  useEffect(() => {
    setPost(data);
    console.log(data);
  }, [data]);
  return (
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Track ID</label>
          <input
            className="form-control"
            type="text"
            name="track_id"
            value={post.track_id}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Box NO.</label>
          <input
            className="form-control"
            type="text"
            name="box_id"
            value={post.box_id}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Weight</label>
          <input
            className="form-control"
            type="number"
            name="weight"
            value={post.weight}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Round Boat</label>
          <input
            className="form-control"
            type="date"
            name="round_boat"
            value={post.round_boat}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
