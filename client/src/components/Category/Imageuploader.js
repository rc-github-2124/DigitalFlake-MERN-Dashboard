import React, { useState } from "react";
import { Form, Image } from "react-bootstrap"; // Make sure to have react-bootstrap installed

const Imageuploader = ({ onImageUpload }) => {
  // State for the image preview
  const [image, setImage] = useState(null);
  
  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set image preview
      onImageUpload(file); // Pass the file to the parent component
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.uploadContainer}>
        {image ? (
          <Image src={image} alt="Preview" style={styles.previewImage} />
        ) : (
          <div style={styles.previewPlaceholder}>No Image</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.fileInput}
        />
      </div>
      <Form.Label style={styles.label}>Upload Image</Form.Label>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "247px",
    height: "203px",
    position: "relative",
  },
  uploadContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ddd",
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius:'15px'
  },
  previewImage: {
    width: "86px",
    height: "86px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  previewPlaceholder: {
    width: "86px",
    height: "86px",
    borderRadius: "8px",
    backgroundColor: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
  },
  fileInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "30px",
    color: "rgb(0, 0, 0)",
    position: "relative",
    top: "25px",
    paddingLeft: "7px",
    zIndex: 1,
    background: "#FFFFF",
    left: "18px",
    paddingRight: "-24px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "30px",

    position: "relative",
    top: "-181px",
    left: "44px",
    zIndex: 10,
    background:'#F9F9F9',
    width:'171px'
  },
};

export default Imageuploader;
