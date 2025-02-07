import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Image, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";
import Imageuploader from "./Imageuploader";
import catarrow from '../../assets/catarrow1.png';
import uploadimage from '../../assets/uploadimage.png';
import borderrectangle from '../../assets/borderrectangle.png';

const Editcategory = () => {
    const { id } = useParams(); // Extract category id from the URL
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('Active');
    const [categoryId, setCategoryId] = useState('');

    // Handle image upload
    const handleImageUpload = (file) => {
        setImage(file); // Set uploaded image
    };

    // Fetch category data on component mount
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/categories/${id}`)
                .then((response) => {
                    const { categoryName, image, status, _id } = response.data;
                    setCategoryName(categoryName);
                    setImage(image);
                    setStatus(status);
                    setCategoryId(_id);
                })
                .catch((error) => {
                    console.error("Error fetching category data:", error);
                });
        }
    }, [id]);

    // Handle save action
    const handleSave = async () => {
        const updatedCategory = new FormData();
        updatedCategory.append("categoryName", categoryName);
        // Convert status to boolean: "Active" -> true, "Inactive" -> false   
        updatedCategory.append("status", status === "Active");
        if (image) {
          updatedCategory.append("image", image); // Append new image file if exists
        }
      
        try {
          const response = await axios.put(`http://localhost:8000/api/categories/${categoryId}`, updatedCategory, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.data) {
            alert("Category updated successfully");
          }
        } catch (error) {
          console.error("Error updating category:", error);
          alert("Failed to update category");
        }
      };

    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <Image style={{ width: '24px', height: '24px', marginTop: '4px' }} src={catarrow}></Image>
                        <h3>Edit Category</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: '40px' }}>
                        <Form.Group className="mb-3" controlId="categoryName">
                            <Form.Label style={{
                                fontFamily: "Poppins", fontWeight: 400, fontSize: "20px", color: "rgb(0 0 0)",
                                position: "relative", top: "25px", paddingLeft: "7px", zIndex: 12, background: "white"
                            }}>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                style={{
                                    position: "relative", width: "350px", height: "61px", border: "1px solid #9F9F9F", borderRadius: "10px"
                                }}
                            />
                        </Form.Group>
                        <Imageuploader onImageUpload={handleImageUpload} image={image} />
                        <div style={{
                            width: '200px', height: '165px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            alignItems: "center", textAlign: 'center'
                        }}>
                            <Image style={{
                                width: "200px", height: "200px"
                            }} src={borderrectangle}></Image>
                            <Image style={{
                                width: "46.79px", height: "43px", position: "relative", top: "-90px"
                            }} src={uploadimage}></Image>
                            <h5 style={{
                                fontFamily: "'Poppins'", fontSize: "10px", color: "#000000", position: "relative", top: "-68px"
                            }}>Upload Maximum allowed file size is 10MB</h5>
                        </div>
                    </div>
                </Col>
            </Row>
            <div>
                <Form.Group className="mb-3" controlId="statusSelect" style={{ width: "350px" }}>
                    <Form.Label style={{
                        fontFamily: "Poppins", fontWeight: 400, fontSize: "20px", color: "rgb(0, 0, 0)", position: "relative", top: "25px",
                        left: "114px", zIndex: 12, background: "white"
                    }}>Status</Form.Label>
                    <Form.Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            width: "100%", height: "61px", border: "1px solid #9F9F9F", borderRadius: "10px", paddingLeft: "10px"
                        }}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <div style={{
                marginTop: '340px', float: 'right', display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '31px'
            }}>
                <button
                    onClick={() => alert("Cancel clicked")}
                    style={{
                        borderRadius: '25px', width: '159px', height: '52px', backgroundColor: '#FFFFFF', border: '1px solid #9F9F9F'
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    style={{
                        borderRadius: '25px', width: '159px', height: '52px', backgroundColor: '#662671', border: '1px solid #9F9F9F', color: 'white'
                    }}
                >
                    Save
                </button>
            </div>
        </Container>
    );
};

export default Editcategory;
