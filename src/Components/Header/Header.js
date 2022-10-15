import React from "react";
import { Navbar, NavItem, NavbarBrand, Nav } from "reactstrap";
import './Header.css';
import logo from "../../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const Header = (props) => {
    let links = null;
    if (props.token === null) {
        links = (
            <Nav className="mr-md-5 Nav">
                <NavItem>
                    <NavLink to="/login" style={{ color: "white", textDecoration: "none", paddingRight: "1rem" }}>Login</NavLink>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav className="mr-md-5 Nav">
                <NavItem>
                    <NavLink to="/" style={{ color: "white", textDecoration: "none", paddingRight: "1rem" }}>Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/orders" style={{ color: "white", textDecoration: "none", paddingRight: "1rem" }}>Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/checkout" style={{ color: "white", textDecoration: "none", paddingRight: "1rem" }}>Checkout</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/logout" style={{ color: "white", textDecoration: "none", paddingRight: "1rem" }}>Logout</NavLink>
                </NavItem>
            </Nav>
        )

    }
    return (
        <div className="Navigation">
            <Navbar style={{ backgroundColor: "#d70f64", height: "70px" }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={logo} width="40px" height="40px" style={{ borderRadius: "8px" }} alt="Logo" />
                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    )
}
export default connect(mapStateToProps)(Header);