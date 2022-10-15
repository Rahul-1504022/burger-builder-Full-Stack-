import React, { Component } from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import Logout from "./Auth/Logout";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import { connect } from "react-redux";
import { authCheck } from "../redux/authActionCreators";

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {

    componentDidMount() {
        this.props.authCheck();
    }


    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <div>
                    <Routes>
                        <Route path="*" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Auth />} />
                    </Routes>
                </div>

            )

        } else {
            routes = (
                <div>
                    <Routes>
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/" element={<BurgerBuilder />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </div>

            )

        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}
                </div>

            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);