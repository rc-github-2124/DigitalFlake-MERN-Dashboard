import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from "react-bootstrap";
import logo2 from '../../assets/logo2.png';
import userlogo from '../../assets/userlogo.png';
import { Button, Modal, Card } from "react-bootstrap";
import warningicon from '../../assets/warningicon.png'
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router";
const Appbar = () => {
  const [show, setShow] = useState(false);
  const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(); // Call logout function
        navigate('/'); // Redirect to login page
    };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <Navbar style={{ background: "#662671", height: "104px" }} data-bs-theme="dark">
        <Container fluid className="d-flex justify-content-between" style={{ height: "100%" }}>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Image
              style={{
                width: "296px",
                height: "46px",
                position: "relative",

              }}
              src={logo2}
              alt="Logo"
            />
          </Navbar.Brand>
          <Nav className="d-flex align-items-center">
            <Nav.Link href="#pricing">
              <Image onClick={handleShow}
                style={{
                  width: "45px",
                  height: "45px",
                  cssFloat: "right",
                  position: "relative",
                  left:'400px'

                }}
                src={userlogo}
                alt="User"
              />
            </Nav.Link>
          </Nav>
          <div>
            {/* Trigger Button */}


            {/* Modal */}
            <Modal  show={show} onHide={handleClose} centered>
              <Modal.Body>
                {/* Card inside the Modal */}
                <Card style={{
              border:'none',
          
            }} >
                  
                  <Card.Body>
                    <div style={{
                      display:'flex',
                      justifyContent:'center',
                      flexDirection:'row',
                      alignItems:'center',
                      gap:'9px',
                      marginTop:'-10px',
                      position:'relative'
                    }}>

                 
                    <Image style={{
                      width:'45px',
                      height:'45px'
                    }} src={warningicon}></Image>
                    <Card.Title style={{
                       marginTop:'20px',
                       fontFamily: "'Poppins'",
                       fontStyle: "normal",
                       fontWeight: 600,
                       fontSize: "22px",
                       lineHeight: "48px",
                       color: "#000000"
                    }}>Log Out</Card.Title>
                    </div>
                    <Card.Text style={{
                      textAlign:'center',
                      fontFamily: "'Poppins'",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "20px",
                      lineHeight: "36px",
                      color: "#8F8F8F"
                    
                    }}>

                    Are you sure you want to log out?
                    </Card.Text>
                    <div style={{
                      display:'flex',
                      justifyContent:'space-evenly',
                      alignItems:'center',
                      flexDirection:'row'
                    }}>

                
                    <button style={{
                      borderRadius:'25px',
                      width:'159px',
                      height:'52px',
                      backgroundColor:'#FFFFFF',
                      border:'1px  solid #9F9F9F'
                    }} variant="outlined" onClick={handleClose}>
                      Close
                    </button>
                    <button  style={{
                      borderRadius:'25px',
                      width:'159px',
                      height:'52px',
                      backgroundColor:'#662671',
                      border:'1px  solid #9F9F9F',
                      color:'white'
                    }} variant="outlined" onClick={handleLogout}>
                      Confirm
                    </button>
                    </div>
                  </Card.Body>
                </Card>
              </Modal.Body>
            </Modal>
          </div>

        </Container>
      </Navbar>
    </>
  );
}

export default Appbar;
