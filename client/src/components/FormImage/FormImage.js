import { useState } from "react";

const FormImage = ({ name, picFile, setPicFile }) => {
  const [image, setImage] = useState(null);
  const handleSelectPicFile = (e) => {
    setPicFile(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImage(objectUrl);
  };

  const handlePaste = (e) => {
    if (e.clipboardData.files.length) {
      setPicFile(e.clipboardData.files[0]);
      const objectUrl = URL.createObjectURL(e.clipboardData.files[0]);
      setImage(objectUrl);
    }
  };
  const onClose = () => {
    setImage(null);
    setPicFile(null);
  };
  return (
    <>
      <input
        className="form-control"
        type="file"
        name="pic_filename"
        onChange={handleSelectPicFile}
      />
      <div
        style={{
          cursor: "pointer",
        }}
      >
        {image === null ? (
          <div
            style={{
              background: "gray",
              width: "100%",
              height: "150px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPaste={handlePaste}
          >
            paste image here
          </div>
        ) : (
          <div style={{ position: "relative" }} onClick={onClose}>
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                fontSize: "2rem",
              }}
            >
              x
            </span>
            <img
              src={image}
              alt={image}
              height={200}
              onPaste={handlePaste}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FormImage;
