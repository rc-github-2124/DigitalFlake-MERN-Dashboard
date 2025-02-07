import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import { useEffect } from "react";
import catarrow from "../../assets/catarrow1.png";
import Form from "react-bootstrap/Form";
import axios from "axios";

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([])
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [productName, setProductName] = useState("");
    const [image, setImage] = useState(null); // To hold the selected image



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/categories");
                setCategories(response.data || []);
                if (response.data && response.data.length > 0) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/subcategories");
                setSubcategories(response.data || []);
                if (response.data && response.data.length > 0) {
                    setSubcategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchSubCategories();
    }, []);


    // Update subcategory name
    const handleSubcategoryChange = (e) => {
        setSubcategory(e.target.value);
    };
    const handleProductChange = (e) => {
        setProductName(e.target.value);
    };

    // Update selected category
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    // Handle file upload
    const handleImageUpload = (file) => {
        setImage(file);
    };




    // Save the new subcategory
    const handleSave = async () => {
        if (!subcategory || !category) {
            alert("Please fill in all fields.");
            return;
        }
        

        // Prepare FormData for the backend
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("subcategory", subcategory);
        if (image) {
            formData.append("image", image);
        }
        formData.append("category", category); // Include category ID
    

        try {

            console.log(formData);
            const response = await axios.post("http://localhost:8000/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product added successfully");
        } catch (error) {
            console.error("Error adding Product:", error);
            alert("Failed to add Product");
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
                                <h3>Add Product</h3>
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
                                        Product Name
                                    </Form.Label>
                                    <Form.Control
                                    value={productName}
                                    onChange={handleProductChange}

                                        style={{
                                            position: "relative",
                                            width: "220px",
                                            height: "61px",
                                            zIndex: 9,

                                            border: "1px solid #9F9F9F",
                                            borderRadius: "10px",
                                        }}
                                        type="text"
                                    />
                                </Form.Group>
                                <div>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="statusSelect"
                                        style={{
                                            position: "relative",
                                            width: "350px",
                                        }}
                                    >
                                        <Form.Label
                                            style={{
                                                width: "134px",
                                                height: "30px",
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                lineHeight: "30px",
                                                color: "rgb(0, 0, 0)",
                                                flex: "0 0 auto",
                                                position: "relative",
                                                top: "25px",
                                                left: "114px",
                                                zIndex: 12,
                                                background: "white"
                                            }}
                                        >
                                            SubCategory
                                        </Form.Label>
                                        <Form.Select onChange={handleSubcategoryChange}
                                              value={subcategory}
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "61px",
                                                zIndex: 9,
                                                border: "1px solid #9F9F9F",
                                                borderRadius: "10px",
                                                paddingLeft: "10px",
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                position: "relative",
                                            }}
                                        >
                                            {subcategories.map((e) => {
                                                return (
                                                    <>
                                                        <option key={e._id} value={e._id}>{e.subcategoryName}</option>
                                                    </>
                                                )
                                            })}
                                        </Form.Select>


                                        <Form.Label
                                            style={{
                                                width: "106px",
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
                                            Category
                                        </Form.Label>
                                        <Form.Select onChange={handleCategoryChange}
                                          value={category}
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "61px",
                                                zIndex: 9,
                                                border: "1px solid #9F9F9F",
                                                borderRadius: "10px",
                                                paddingLeft: "10px",
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                position: "relative",
                                            }}
                                        >
                                            {categories.map((e) => {
                                                return (
                                                    <>
                                                        <option key={e._id} value={e._id} >{e.categoryName}</option>
                                                    </>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
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
                        onClick={handleSave}
                        style={{
                            borderRadius: "25px",
                            width: "159px",
                            height: "52px",
                            backgroundColor: "#662671",
                            border: "1px  solid #9F9F9F",
                            color: "white",
                        }}
                        variant="outlined"
                    >
                        Save
                    </button>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    marginTop: '10px'
                }}>




                </div>
            </Container>
        </>
    );
};

export default AddProduct;
