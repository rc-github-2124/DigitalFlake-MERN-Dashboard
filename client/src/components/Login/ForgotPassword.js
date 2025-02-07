import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const { token } = useParams(); // Ensure you're accessing the correct route parameter
    const [newPassword, setNewPassword] = useState("");
const navigate = useNavigate();
    const handleNewPass = (e) => {
        setNewPassword(e.target.value); // Update the state with the new password
    };

    const handleNewPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `http://localhost:8000/api/user/reset-password/${token}`, 
                { newPassword }
            );
            alert('Password Reset Successful');
            navigate('/');

        } catch (err) {
            alert('Password Reset Failed');
            console.error(err);
        }
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <Form.Label style={{
                            width: "153px",
                            height: "30px",
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 300,
                            fontSize: "15px",
                            lineHeight: "30px",
                            color: "rgb(157, 157, 157)",
                            flex: "0 0 auto",
                            position: "relative",
                            zIndex: 1,
                            left: "18px",
                        }}>
                            Enter New Password
                        </Form.Label>
                        <Form.Control
                            style={{
                                position: 'relative',
                                width: "100%",
                                height: "61px",
                                border: "1px solid #9F9F9F",
                                borderRadius: "10px"
                            }}
                            type="password" // Correct input type for passwords
                            value={newPassword}
                            onChange={handleNewPass}
                        />
                        <br />
                        <Button onClick={handleNewPassword}>Submit</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ForgotPassword;
