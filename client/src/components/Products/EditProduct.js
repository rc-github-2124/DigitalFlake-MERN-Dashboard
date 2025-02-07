import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import ProductImage from "./ProductImage";
import catarrow from '../../assets/catarrow1.png';
import uploadimage from '../../assets/uploadimage.png';
import borderrectangle from '../../assets/borderrectangle.png';
import { useParams } from "react-router";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams();  // Get the product ID from URL parameters

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
         const [productID, setProductID] = useState('');
    const [subcategory, setSubcategory] = useState('');
const [status,setStatus] = useState('Active');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    // Fetch product data when the component mounts
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                const { productName, category,subcategory,_id } = response.data;
                setProductName(productName);
                setProductID(_id);
                setCategory(category._id);
                setSubcategory(subcategory._id)
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProduct();
    }, [id]);

    // Fetch categories for the category dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/categories");
                setCategories(response.data);
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
                setSubcategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchSubCategories();
    }, []);

    // Handle image upload
    const handleImageUpload = (e) => {
      console.log('Image placeholder here') // Set the uploaded image file
    };

    // Handle form submission (Save the updated product)
    const handleSave = async () => {
        if (!productName || !category) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("status", status === "Active");
        formData.append("productName", productName);
        formData.append("category", category);
        formData.append("subcategory", subcategory);
      
        try {
            const response = await axios.put(`http://localhost:8000/api/products/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensures image is sent correctly
                },
            });

            if (response.data) {
                alert("Product updated successfully");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product");
        }
    };

    return (
        <Container fluid className="py-3">
            <Row className="mb-4">
                <Col xs={12} className="d-flex align-items-center">
                    <Image
                        src={catarrow}
                        style={{ width: '24px', height: '24px', marginRight: '10px' }}
                    />
                    <h3 className="mb-0">Edit Product</h3>
                </Col>
            </Row>
            <Row className="mb-4">
                {/* Category Name */}
                <Col xs={12} md={4} className="mb-3">
                    <Form.Group controlId="categoryName">
                        <Form.Label className="d-block" style={labelStyles}>
                            Category Name
                        </Form.Label>
                        <Form.Select
                            style={inputStyles}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </Form.Select>
                        
                    </Form.Group>
                </Col>
                {/* Product Name */}
                <Col xs={12} md={4} className="mb-3">
                    <Form.Group controlId="productName">
                        <Form.Label className="d-block" style={labelStyles}>
                            Product Name
                        </Form.Label>
                        <Form.Control
                            style={inputStyles}
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                {/* Price */}
                <Col xs={12} md={4}>
                <Form.Label className="d-block" style={labelStyles}>
                            SubCategory Name
                        </Form.Label>
                        <Form.Select
                            style={inputStyles}
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                        >
                            {subcategories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.subcategoryName}
                                </option>
                            ))}
                        </Form.Select>
                </Col>
            </Row>
            <Row className="mb-4">
                {/* Status */}
                <Col xs={12} md={4} className="mb-3">
                    <Form.Group controlId="statusSelect">
                        <Form.Label className="d-block" style={labelStyles}>
                            Status
                        </Form.Label>
                        <Form.Select onChange={(e)=>setStatus(e.target.value)} style={inputStyles}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                {/* Upload Image */}
                <Col xs={12} md={8} className="d-flex justify-content-center">
                    <div style={uploadContainerStyles}>
                        <Image src={borderrectangle} style={borderImageStyles} />
                        <Image
                            src={uploadimage}
                            style={uploadIconStyles}
                            onClick={() => document.getElementById("imageInput").click()}
                        />
                        <input
                            type="file"
                            id="imageInput"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                        <h5 style={uploadTextStyles}>
                            Upload Maximum allowed file size is 10MB
                        </h5>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col xs={12} className="d-flex justify-content-end gap-3">
                    <button style={cancelButtonStyles}>Cancel</button>
                    <button style={saveButtonStyles} onClick={handleSave}>Save</button>
                </Col>
            </Row>
        </Container>
    );
};

// Styles
const labelStyles = {
    width: "143px",
    top: "21px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    color: "rgb(0, 0, 0)",
    background: "white",
    paddingLeft: "5px",
    position: "relative",
    zIndex: 12,
    left: "29px"
};

const inputStyles = {
    width: '100%',
    height: '50px',
    border: "1px solid #9F9F9F",
    borderRadius: "10px",
    paddingLeft: "10px",
    fontFamily: "Poppins",
    fontSize: "16px",
};

const uploadContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '300px',
    width: '100%',
};

const borderImageStyles = {
    position: "relative",
    top: "0px",
    left: "0px",
    width: "100%",
    maxWidth: "200px",
    height: "auto",
};

const uploadIconStyles = {
    width: "50px",
    height: "50px",
    position: "relative",
    top: "-121px"
};

const uploadTextStyles = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "9px",
    lineHeight: "15px",
    textAlign: "center",
    color: "rgb(0, 0, 0)",
    position: "relative",
    top: "-89px"
};

const cancelButtonStyles = {
    borderRadius: '25px',
    width: '120px',
    height: '40px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #9F9F9F',
    fontFamily: "Poppins",
    fontSize: "14px",
};

const saveButtonStyles = {
    borderRadius: '25px',
    width: '120px',
    height: '40px',
    backgroundColor: '#662671',
    border: '1px solid #9F9F9F',
    color: 'white',
    fontFamily: "Poppins",
    fontSize: "14px",
};

export default EditProduct;
