import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { saveAs } from "file-saver";

export const ExportModal = (props) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [username, setUsername] = useState("");
  const [voyage, setVoyage] = useState("");
  const [channel, setChannel] = useState("");
  const [selectFilter, setSelectFilter] = useState({
    username: false,
    voyage: false,
    channel: false,
  });
  const handleClick = async (e) => {
    e.preventDefault();
    await fetch("/export/tracking", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: from,
        to: to,
        username: selectFilter.username ? username : null,
        voyage: selectFilter.voyage ? voyage : null,
        channel: selectFilter.channel ? channel : null,
      }),
    })
      .then((res) => res.blob())
      .then((data) => {
        saveAs(data, "trackings.xlsx");
      })
      .catch((error) => console.log(error));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Export Tracking
        </Modal.Title>
      </Modal.Header>
      <Modal.Body scrollable="true">
        <form onSubmit={handleClick}>
          <label className="me-3">From:</label>
          <input
            type="date"
            className="me-3"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <label className="me-3">To:</label>
          <input
            type="date"
            className="mb-3"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <br />
          <label className="me-3">
            <input
              type="checkbox"
              defaultChecked={selectFilter.username}
              onClick={() =>
                setSelectFilter({
                  ...selectFilter,
                  username: !selectFilter.username,
                })
              }
            />{" "}
            username
          </label>
          <label className="me-3">
            <input
              type="checkbox"
              defaultChecked={selectFilter.voyage}
              onClick={() =>
                setSelectFilter({
                  ...selectFilter,
                  voyage: !selectFilter.voyage,
                })
              }
            />{" "}
            voyage
          </label>
          <label className="me-3 mb-3">
            <input
              type="checkbox"
              defaultChecked={selectFilter.channel}
              onClick={() =>
                setSelectFilter({
                  ...selectFilter,
                  channel: !selectFilter.channel,
                })
              }
            />{" "}
            channel
          </label>
          <br />
          {selectFilter.username && (
            <>
              <label className="me-3">username</label>
              <input
                className="mb-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
            </>
          )}
          {selectFilter.voyage && (
            <>
              <label className="me-3">voyage</label>
              <input
                className="mb-3"
                type="date"
                value={voyage}
                onChange={(e) => setVoyage(e.target.value)}
              />
              <br />
            </>
          )}
          {selectFilter.channel && (
            <>
              <label className="me-3">channel</label>
              <select
                className="mb-3"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
              >
                <option value={null}>select</option>
                <option value="shimizu">shimizu</option>
                <option value="mercari">mercari</option>
                <option value="fril">fril</option>
                <option value="123">web123</option>
              </select>
            </>
          )}
          <button type="submit">export</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
