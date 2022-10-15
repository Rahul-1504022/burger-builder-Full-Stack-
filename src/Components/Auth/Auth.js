import React, { Component } from "react";
import { Formik } from "formik";
import { auth } from "../../redux/authActionCreators";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { Alert } from "reactstrap";

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode)),
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}

class Auth extends Component {
    state = {
        mode: "Sign Up",
    }

    switchModeHandler = () => {
        if (this.state.mode === "Sign Up") {
            this.setState({
                mode: "Login",
            })
        } else {
            this.setState({
                mode: "Sign Up",
            })
        }

    }

    render() {
        let err = null;
        if (this.props.authFailedMsg !== null) {
            err = <Alert color="danger">{this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    }}
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode)
                        }
                    }

                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = "Email Required";
                        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
                            errors.email = "Invalid Email Address";
                        }

                        if (!values.password) {
                            errors.password = "Required";
                        } else if (values.password.length < 6) {
                            errors.password = "must be at least 6 characters";
                        }

                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "Required";
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "Password field does not match!";
                            }
                        }


                        //console.log("Errors", errors);
                        return errors;
                    }

                    }
                >
                    {({ values, handleChange, handleSubmit, errors }) => <div className="container" style={{ border: "2px solid wheat", padding: "50px 80px", textAlign: "center", borderRadius: "10px" }}>
                        <button onClick={this.switchModeHandler} style={{ width: "100%", backgroundColor: "#d70f64", color: "white" }} className="btn btn-large">Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                        <br />
                        <br />
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                className="form-control"
                                value={values.email}
                                onChange={handleChange}
                                validate />
                            <p style={{ color: "red" }}>{errors.email}</p>
                            <br />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                value={values.password}
                                onChange={handleChange}
                                validate />
                            <p style={{ color: "red" }}>{errors.password}</p>
                            <br />
                            {this.state.mode === "Sign Up" ? <div>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                    validate />
                                <p style={{ color: "red" }}>{errors.passwordConfirm}</p>
                            </div> : null}


                            <br />
                            <button type="submit" className="btn btn-success">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                        </form>
                    </div>}
                </Formik>
            )
        }
        return (
            <div>
                {err}
                {form}
            </div >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);