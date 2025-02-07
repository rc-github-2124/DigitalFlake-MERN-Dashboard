import React from "react";
import { Button, Container } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Imageuploader from "./Imageuploader";
import catarrow from "../../assets/catarrow1.png";
import Form from "react-bootstrap/Form";
import uploadimage from "../../assets/uploadimage.png";
import borderrectangle from "../../assets/borderrectangle.png";
import { useState, useEffect } from "react";
import axios from "axios";
const Addcategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState(null); // To hold the selected image

    const handleImageUpload = (file) => {
        setImage(file); // Assuming Imageuploader returns the selected image
    };

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSave = async () => {
        if (!categoryName || !image) {
          alert("Please fill all fields.");
          return;
        }
      
        // Prepare form data to send to the backend
        const formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("image", image); // Pass the raw image file to the backend
      
        try {
          // Send POST request to the backend
          const response = await axios.post("http://localhost:8000/api/categories", formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Set header for file upload
            },
          });
          console.log(response.data);
          alert("Category added successfully");
        } catch (error) {
          console.error("Error adding category:", error);
          alert("Failed to add category");
        }
      };
    return (
        <>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                }}
                            >
                                <Image
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        marginTop: "4px",
                                    }}
                                    src={catarrow}
                                ></Image>
                                <h3>Add Category</h3>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    gap: "40px",
                                }}
                            >
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        style={{
                                            width: "171px",
                                            height: "30px",
                                            fontFamily: "Poppins",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            lineHeight: "30px",
                                            color: "rgb(0 0 0)",
                                            flex: "0 0 auto",
                                            position: "relative",
                                            top: "25px",
                                            paddingLeft: "7px",
                                            zIndex: 12,
                                            background: "white",
                                            left: "18px",
                                            paddingRight: "-24px",
                                        }}
                                    >
                                        Category Name
                                    </Form.Label>
                                    <Form.Control
                                        style={{
                                            position: "relative",
                                            width: "220px",
                                            height: "61px",
                                            zIndex: 9,

                                            border: "1px solid #9F9F9F",
                                            borderRadius: "10px",
                                        }}
                                        type="text"

                                        value={categoryName}
                                        onChange={handleCategoryNameChange}
                                    />
                                </Form.Group>
                                <Imageuploader onImageUpload={handleImageUpload} />
                                <div
                                    style={{
                                        width: "200px",
                                        height: "165px",

                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Image
                                        style={{
                                            position: "relative",
                                            top: "39px",
                                            left: "0px",
                                            width: "200px",
                                            height: "200px",
                                        }}
                                        src={borderrectangle}
                                    ></Image>
                                    <Image
                                        style={{
                                            width: "46.79px",
                                            height: "43px",
                                            position: "relative",
                                            top: "-90px",
                                        }}
                                        src={uploadimage}
                                    ></Image>
                                    <h5
                                        style={{
                                            fontFamily: "'Poppins'",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            fontSize: "10px",
                                            lineHeight: "15px",
                                            textAlign: "center",
                                            color: "#000000",
                                            position: "relative",
                                            top: "-68px",
                                        }}
                                    >
                                        Upload Maximum allowed file size is 10MB
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div
                    style={{
                        marginTop: "340px",
                        float: "right",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: "31px",
                    }}
                >
                    <button
                        style={{
                            borderRadius: "25px",
                            width: "159px",
                            height: "52px",
                            backgroundColor: "#FFFFFF",
                            border: "1px  solid #9F9F9F",
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            borderRadius: "25px",
                            width: "159px",
                            height: "52px",
                            backgroundColor: "#662671",
                            border: "1px  solid #9F9F9F",
                            color: "white",

                        }} onClick={handleSave}
                        variant="outlined"
                    >
                        Save
                    </button>
                </div>
            </Container>
        </>
    );
};

export default Addcategory;