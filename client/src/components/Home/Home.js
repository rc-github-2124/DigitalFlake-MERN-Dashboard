import React from "react";
import { Container, Row, Image } from "react-bootstrap";
import homelogo from '../../assets/homelogo.png'
const Home = () => {
    return (
        <>
            <Container>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    flexDirection:'column',
                    gap:'10px'
                }}>
                    <Image src={homelogo}></Image>
                    <p style={{
                          fontFamily: "'Poppins'",
                          fontStyle: "normal",
                          fontWeight: 300,
                          fontSize: "24px",
                          lineHeight: "36px",
                          color: "#000000",
                          
                          
                    }}>Welcome to Digitalflake admin</p>
                </div>

            </Container>
        </>
    )
}

export default Home;