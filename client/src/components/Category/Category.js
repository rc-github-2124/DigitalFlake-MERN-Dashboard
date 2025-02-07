import React from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import caticon from '../../assets/caticon1.png';
import searchicon from '../../assets/searchicon.png';
import CategoryTable from "./CategoryTable";
import { Link } from "react-router";
const Category = () => {
    return (
        <>
            <Container fluid>
                <Row>

                    <Col xs={12} lg={4}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            gap:'19px'
                        }}>
                            <Image src={caticon}></Image>
                            <h3>Category</h3>
                        </div>
                    </Col>
                    <Col xs={12} lg={4}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: '450px',
                            marginLeft:'-110px'
                        }}>

                            <Image style={{
                                position: 'relative',
                                width: '24px',
                                height: '24px',
                                left: '34px',
                                top: '10px'
                            }} src={searchicon}></Image>
                            <input style={{
                                width: '100%',
                                borderRadius: '10px',
                                height: '43px',
                                border:'1px solid black'
                            }} />
                        </div>
                    </Col>


                    <Col xs={12} lg={4}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'flex-end'
                        }}>


                            <Button style={{
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
                                marginTop:'-3px'
                            }}><Link to="/category/addnew">Add New</Link></Button>
                        </div>
                    </Col>

                </Row>
                <Row>

                    <Col lg={12}>
                    <div style={{
                        marginTop:'40px'
                    }}>

                
                    <CategoryTable/>
                    </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Category;