import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import heroimage from '../../assets/heroimage.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './login.css';
import logo from '../../assets/logo.png'
import Form from 'react-bootstrap/Form';
import passImage from '../../assets/pass.png';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/Authcontext";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
const Login = () => {
    const [togglePass, setTogglePass] = useState('password');
    // useEffect(() => {
    //     if (togglePass === 'text') {
    //         setTimeout(() => {
    //             setTogglePass('password')
    //         }, 2000)
    //     }
    // })




    const [email, setEmail] = useState('');
    const [resetemail, setResetEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user,EmailPass} = useAuth(); // Use context

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (user) {
            navigate('/home');  // Replace '/dashboard' with your protected route
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
        alert('Login Success');
        navigate('/home')

     
    };

    const handleResetLink =async (e)=>{
        e.preventDefault();
        setResetEmail(e.target.value);
        
        

    }

    const handleResetSubmit = async()=>{
       const res =  await EmailPass(resetemail);
        alert('Link Sent, Please Check Inbox');
    }
    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="login_container">
                            <Image src={heroimage} fluid />
                        </div>
                        <Card className="custom_card" style={{
                            width: "660px",
                            height: "802px",
                            left: "103px",
                            top: "147px",
                            position: 'absolute'
                        }}>
                            <Card.Body>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <Image style={{ width: '238px', height: '124px', position: 'relative', top: '94px' }} src={logo}></Image>
                                    <h2 style={{
                                        position: 'relative', top: '100px', fontFamily: "'Poppins'",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "24px",
                                        lineHeight: "36px",
                                        color: "#868686"
                                    }}>Welcome to Digitalflake admin</h2>

                                    <Form onSubmit={handleLogin} style={{
                                        marginTop: '100px'
                                    }}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label style={{
                                                width: "153px",
                                                height: "30px",
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                lineHeight: "30px",
                                                color: "rgb(157, 157, 157)",
                                                flex: "0 0 auto",
                                                position: "relative",
                                                top: "25px",
                                                paddingLeft: "7px",
                                                zIndex: 1,
                                                background: "rgb(255, 255, 255)",
                                                left: "18px",
                                                paddingRight: "-24px"
                                            }} >Email address</Form.Label>
                                            <Form.Control style={{
                                                position: 'relative',
                                                width: "530px",
                                                height: "61px",

                                                border: "1px solid #9F9F9F",
                                                borderRadius: "10px"
                                            }} type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>
                                            <Form.Label style={{
                                                width: "110px",
                                                height: "30px",
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                lineHeight: "30px",
                                                color: "rgb(157, 157, 157)",
                                                flex: "0 0 auto",
                                                position: "relative",
                                                top: "25px",
                                                paddingLeft: "7px",
                                                zIndex: 1,
                                                background: "rgb(255, 255, 255)",
                                                left: "18px",
                                                paddingRight: "4px"
                                            }} >Password</Form.Label>
                                            <Form.Control style={{
                                                position: 'relative',
                                                width: "530px",
                                                height: "61px",
                                                border: "1px solid #9F9F9F",
                                                borderRadius: "10px"
                                            }} type={togglePass}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <Image onClick={() => { setTogglePass('text') }} style={{
                                            position: "relative",
                                            cssFloat: "right",
                                            left: "-11px",
                                            top: "-59px"
                                        }} src={passImage}></Image>
                                        <Button onClick={handleShow} style={{
                                            fontFamily: "'Poppins'",
                                            fontStyle: "normal",
                                            fontWeight: 300,
                                            fontSize: "20px",
                                            lineHeight: "30px",
                                            color: "#5C218B",
                                            float: 'right',
                                            left: '20px',
                                            position: 'relative',
                                            background: 'none',
                                            border: 'none'
                                        }}>Forgot Password?</Button>

<Button type="submit" style={{
                                        background: "#5C218B",
                                        borderRadius: "10px",
                                        width: "530px",
                                        height: "58px",
                                        marginTop: '159px',
                                        position: 'relative'
                                    }}>
                                        <span style={{
                                            fontFamily: "'Poppins'",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            fontSize: "24px",
                                            lineHeight: "36px",
                                            color: "#FFFFFF"
                                        }}>
                                            Log In
                                        </span>
                                    </Button>
                                    </Form>
                                   


                                    <Modal style={{
                                        height: '503px',
                                        width: '900px'
                                    }} show={show} onHide={handleClose}>

                                        <Modal.Title>

                                            <p style={{
                                                fontFamily: "'Poppins'",
                                                fontStyle: "normal",
                                                fontWeight: 500,
                                                fontSize: "23px",
                                                lineHeight: "48px",
                                                color: "#5C218B",
                                                textAlign: 'center',
                                                top: '30px',
                                                position: 'relative'
                                            }}>Did you forget password?</p>
                                            <p style={{
                                                fontFamily: "'Poppins'",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "15px",
                                                lineHeight: "36px",
                                                color: "#8F8F8F",
                                                textAlign: 'center',
                                                position: 'relative',
                                                top: '10px'



                                            }}>Enter your email address and we’ll send you a link to restore password
                                            </p>
                                        </Modal.Title>

                                        <Modal.Body>




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

                                            }}>Email address</Form.Label>
                                            <Form.Control onChange={handleResetLink} style={{
                                                position: 'relative',
                                                width: "100%",
                                                height: "61px",

                                                border: "1px solid #9F9F9F",
                                                borderRadius: "10px"
                                            }} type="email" />
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                width: '100%'
                                            }}>
                                                <Button type="submit" onClick={handleResetSubmit} style={{
                                                    background: "#5C218B",
                                                    borderRadius: "10px"
                                                }}> <span style={{
                                                    fontFamily: "'Poppins'",
                                                    fontStyle: "normal",
                                                    fontWeight: 500,
                                                    lineHeight: "36px",
                                                    color: "#FFFFFF",
                                                }}>
                                                        Request Reset Link
                                                    </span></Button>
                                                <a onClick={handleClose} style={{
                                                    fontFamily: "'Poppins'",
                                                    fontStyle: "normal",
                                                    fontWeight: 400,
                                                    lineHeight: "30px",
                                                    color: "#8F8F8F",
                                                    textAlign: 'center',
                                                    textDecoration: 'underline',
                                                    marginTop: '10px',
                                                    cursor: "pointer"
                                                }}>Back to login</a>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>
                                </div>

                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login