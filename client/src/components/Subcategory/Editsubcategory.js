import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Imageuploader from "./SubImage";
import catarrow from '../../assets/catarrow1.png';
import Form from "react-bootstrap/Form";
import uploadimage from '../../assets/uploadimage.png';
import borderrectangle from '../../assets/borderrectangle.png';
import axios from "axios";
import { useParams } from "react-router-dom";

const Editsubcategory = () => {
    const { id } = useParams(); // Get the subcategory ID from the URL
 // Extract category id from the URL
     const [subcategoryName, setsubCategoryName] = useState('');
     const [status, setStatus] = useState('Active');
     const [subcategoryId, setsubCategoryId] = useState('');
     const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    
    // Handle image upload
    const handleImageUpload = (file) => {
        setImage(file);
    };

    // Fetch subcategory data on component mount
    useEffect(() => {
        axios.get(`http://localhost:8000/api/subcategories/${id}`)
            .then((response) => {
                const { subcategoryName, category, status, image,_id } = response.data;
                setsubCategoryName(subcategoryName);
                setCategory(category._id);
                setsubCategoryId(_id);
                setStatus(status)
                setImage(image);
          
            })
            .catch((error) => {
                console.error("Error fetching subcategory data:", error);
            });
          
    }, [id]);



    
    // Handle save
    const handleSave = async () => {
        const formData = new FormData();
        formData.append("status", status === "Active");
        formData.append("subcategoryName",subcategoryName);
        formData.append("category",category);
        if (image) {
            formData.append("image", image); // Include the image if provided
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/subcategories/${subcategoryId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data) {
                alert("Subcategory updated successfully");
            }
        } catch (error) {
            console.error("Error updating subcategory:", error);
            alert("Failed to update subcategory");
        }
    };

    return (
        <>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <Image style={{ width: '24px', height: '24px', marginTop: '4px' }} src={catarrow}></Image>
                                <h3>Edit Subcategory</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: '40px' }}>
                                <Form.Group className="mb-3" controlId="subcategories">
                                    <Form.Label style={{
                                        fontFamily: "Poppins", fontWeight: 400, fontSize: "20px", color: "rgb(0 0 0)",
                                        position: "relative", top: "25px", paddingLeft: "7px", zIndex: 12, background: "white"
                                    }}>Subcategory Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={subcategoryName}
                                        onChange={(e) => setsubCategoryName(e.target.value)}
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
                            onChange={(e) => setStatus(e.target.value )}
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
        </>
    );
};

export default Editsubcategory;
