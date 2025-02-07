import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import SubImage from "./SubImage"; // Assuming this handles image upload for the subcategory
import catarrow from "../../assets/catarrow1.png";
import borderrectangle from "../../assets/borderrectangle.png";
import uploadimage from "../../assets/uploadimage.png";

const Addsubcategory = () => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [category, setCategory] = useState(""); 
  const [categories, setCategories] = useState([]); 
  const [image, setImage] = useState(null); 

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories"); 
        setCategories(response.data || []);
        if (response.data && response.data.length > 0) {
          setCategory(response.data); 
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  // Update subcategory name
  const handleSubcategoryChange = (e) => {
    setSubcategoryName(e.target.value);
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
    if (!subcategoryName || !category || !image) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Prepare FormData for the backend
    const formData = new FormData();
    formData.append("subcategoryName", subcategoryName);
    formData.append("category", category); // Include category ID
    formData.append("image", image); // Include the uploaded image
  
    try {
      const response = await axios.post("http://localhost:8000/api/subcategories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Subcategory added successfully");
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <Image style={{ width: "24px", height: "24px", marginTop: "4px" }} src={catarrow} />
              <h3>Add Sub Category</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "40px" }}>
              {/* Subcategory Name */}
              <Form.Group className="mb-3" controlId="subcategoryName">
                <Form.Label style={{ fontSize: "20px", fontFamily: "Poppins", marginLeft: "18px" }}>
                  Sub Category
                </Form.Label>
                <Form.Control
                  style={{
                    width: "220px",
                    height: "61px",
                    border: "1px solid #9F9F9F",
                    borderRadius: "10px",
                  }}
                  type="text"
                  value={subcategoryName}
                  onChange={handleSubcategoryChange}
                />
              </Form.Group>

              {/* Category Dropdown */}
              <Form.Group className="mb-3" controlId="categorySelect" style={{ width: "350px" }}>
                <Form.Label style={{ fontSize: "20px", fontFamily: "Poppins", left: "114px" }}>
                  Category
                </Form.Label>
                <Form.Select
                  style={{
                    width: "100%",
                    height: "61px",
                    border: "1px solid #9F9F9F",
                    borderRadius: "10px",
                    paddingLeft: "10px",
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}
                  value={category}
                  onChange={handleCategoryChange}
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div style={{ marginTop: "340px", float: "right", display: "flex", justifyContent: "center", gap: "31px" }}>
          <Button
            style={{
              borderRadius: "25px",
              width: "159px",
              height: "52px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #9F9F9F",
            }}
            onClick={() => alert("Cancel")}
          >
            Cancel
          </Button>
          <Button
            style={{
              borderRadius: "25px",
              width: "159px",
              height: "52px",
              backgroundColor: "#662671",
              border: "1px solid #9F9F9F",
              color: "white",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>

        {/* Image Upload */}
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", marginTop: "10px" }}>
          <SubImage onImageUpload={handleImageUpload} />
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
            <Image style={{ width: "200px", height: "200px" }} src={borderrectangle} />
            <Image style={{ width: "46.79px", height: "43px", position: "relative", top: "-90px" }} src={uploadimage} />
            <h5
              style={{
                fontFamily: "'Poppins'",
                fontSize: "10px",
                lineHeight: "15px",
                textAlign: "center",
                color: "#000000",
                top: "-68px",
              }}
            >
              Upload Maximum allowed file size is 10MB
            </h5>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Addsubcategory;
