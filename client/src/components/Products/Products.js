import React, { useState, useEffect } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import caticon from '../../assets/caticon1.png';
import searchicon from '../../assets/searchicon.png';
import ProductTable from "./ProductTable";  // Assuming ProductTable is another component to display the list of products
import { Link } from "react-router-dom"; // Using react-router-dom instead of 'react-router'
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);  // To hold product data
    const [productName, setProductName] = useState("");  // For product name
    const [category, setCategory] = useState("");  // For category
    const [price, setPrice] = useState("");  // For price
    const [image, setImage] = useState(null);  // For image
    const [categories, setCategories] = useState([]);  // To hold categories for dropdown

    // Fetch product data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/products");
                setProducts(response.data);  // Populate products
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Fetch categories for dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/categories");
                setCategories(response.data);  // Populate categories
                if (response.data.length > 0) {
                    setCategory(response.data[0].id);  // Set the first category as default
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Handle adding new product
    const handleAddProduct = async () => {
        if (!productName || !category || !price) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("category", category);
        formData.append("price", price);

        if (image) {
            formData.append("image", image); // Add image if selected
        }

        try {
            const response = await axios.post("http://localhost:8000/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensures image is sent correctly
                },
            });
            alert("Product added successfully");
            setProductName("");
            setCategory("");
            setPrice("");
            setImage(null);
            // Fetch products again to update the list
            const updatedResponse = await axios.get("http://localhost:8000/api/products");
            setProducts(updatedResponse.data);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        }
    };

    return (
        <>
            <Container fluid>
                <Row>
                    {/* Title Section */}
                    <Col xs={12} lg={4}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            gap: '19px'
                        }}>
                            <Image src={caticon} />
                            <h3>Products</h3>
                        </div>
                    </Col>

                    {/* Search Section */}
                    <Col xs={12} lg={4}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: '450px',
                            marginLeft: '-110px'
                        }}>
                            <Image
                                style={{
                                    position: 'relative',
                                    width: '24px',
                                    height: '24px',
                                    left: '34px',
                                    top: '10px'
                                }}
                                src={searchicon}
                            />
                            <input
                                style={{
                                    width: '75%',
                                    borderRadius: '10px',
                                    height: '43px',
                                    border: '1px solid black'
                                }}
                                value={productName}  // Bind search input to productName state
                                onChange={(e) => setProductName(e.target.value)}  // Update state on input change
                            
                            />
                        </div>
                    </Col>

                    {/* Add New Product Button */}
                    <Col xs={12} lg={4}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                style={{
                                    background: "#662671",
                                    borderRadius: "10px",
                                    width: "116px",
                                    height: "48px",
                                    fontFamily: "'Poppins'",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#FFFFFF",
                                    marginTop: '-3px'
                                }}
                            >
                                <Link
                                    to="/product/addnew"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none"
                                    }}
                                >
                                    Add New
                                </Link>
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* Product Table Section */}
                <Row>
                    <Col lg={12}>
                        <div style={{ marginTop: '40px' }}>
                            <ProductTable products={products} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Products;
