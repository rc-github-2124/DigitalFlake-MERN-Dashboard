import React from "react";
import { Nav } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import homeicon from '../../assets/homeicon.png';
import categoryicon from '../../assets/categoryicon.png';
import subcategorylogo from '../../assets/subcategorylogo.png';
import productlogo from '../../assets/productlogo.png';
import arrow from '../../assets/arrow.png';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation(); // Get the current location

    const navItems = [
        { name: "Home", icon: homeicon, path: "/home" },
        { name: "Category", icon: categoryicon, path: "/category" },
        { name: "Subcategory", icon: subcategorylogo, path: "/subcategory" },
        { name: "Products", icon: productlogo, path: "/products" },
    ];

    return (
        <div style={styles.sidebar}>
            <Nav className="flex-column">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.navItemContainer,
                            backgroundColor: location.pathname === item.path ? "#F4EDAF" : "transparent",
                        }}
                    >
                        <Link
                            to={item.path}
                            style={styles.navLink}
                            className={`d-flex justify-content-between align-items-center ${
                                location.pathname === item.path ? "active" : ""
                            }`}
                        >
                            <div style={styles.navItem}>
                                <Image style={styles.icon} src={item.icon} alt={`${item.name} icon`} />
                                <span style={styles.navText}>{item.name}</span>
                            </div>
                            <Image className="arrowicon" style={styles.arrowIcon} src={arrow} alt="arrow icon" />
                        </Link>
                    </div>
                ))}
            </Nav>
        </div>
    );
};

const styles = {
    sidebar: {
        width: "100%",
        maxWidth: "353px",
        height: "100vh",
        backgroundColor: "#F4F4F4",
        padding: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    navItemContainer: {
        borderRadius: "5px",
        marginBottom: "5px",
        padding: "10px 0",
        height:'54px',
        width:'100%',

   
       
     
    },
    navLink: {
        color: "#000",
        textDecoration: "none",
        padding: "10px 15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop:'-12px'
    },
    navItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    icon: {
        width: "40px",
        height: "40px",
        
    },
    navText: {
        fontFamily: "'Poppins'",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: "24px",
        lineHeight: "36px",
        color: "#000000",
        marginLeft: "24px",
    },
    arrowIcon: {
        width: "15px",
        height: "15px",
       float:'right',
      
      
    
    },
};

export default Sidebar;
