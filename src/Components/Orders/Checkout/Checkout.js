import { Component } from "react";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, Row, Col, Label, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner.js";
import { Link } from "react-router-dom";
import { resetIngredients } from "../../../redux/actionCreators";
import { API } from "../../../config.js";

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable,
        userId: state.userId,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }

}
class Checkout extends Component {
    state = {
        values: {
            name: "",
            email: "",
            address: "",
            city: "",
            postcode: "",
            country: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMessage: "",
        redirectURL: false,

    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    inputChangeHandler = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        })

    }

    submitHandler = (event) => {
        this.setState({
            isLoading: true
        })
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            totalPrice: this.props.totalPrice,
            // orderTime: new Date(),
            userId: this.props.userId,
        }
        if (this.state.values.paymentType === "Cash On Delivery") {
            axios.post(`${API}/order`, order, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.token}`
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        this.setState({
                            isLoading: false,
                            isModalOpen: true,
                            modalMessage: "Order Placed Successfully",
                        })
                        this.props.resetIngredients();
                    } else {
                        this.setState({
                            isLoading: false,
                            isModalOpen: true,
                            modalMessage: "Something Went Wrong,Order Again!",
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMessage: error,
                    })
                })
        } else {
            axios.post(`${API}/order`, order, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.token}`
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        axios.get(`${API}/payment`, {
                            headers: {
                                "Authorization": `Bearer ${this.props.token}`
                            }
                        })
                            .then(response => {
                                this.setState({
                                    ...this.state,
                                    redirectURL: response.data.GatewayPageURL,
                                })
                            })
                            .catch(err => console.log("axios get", err));

                        this.setState({
                            ...this.state,
                            isLoading: false,
                        })
                    }
                })
                .catch(error => {
                    console.log("axios post", error);
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMessage: error,
                    })
                })
        }


    }

    render() {
        let form = (
            <div style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <h4 style={{ border: "1px solid grey", borderRadius: "8px", padding: "30px" }}>Payment:{this.props.totalPrice} BDT</h4>
                <Form style={{ border: "1px solid white", borderRadius: "8px", padding: "30px" }} onSubmit={this.submitHandler}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="userName">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="userName"
                                    value={this.state.values.name}
                                    placeholder="name"
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={this.state.values.email}
                                    placeholder="e-mail"
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    type="textarea"
                                    id="address"
                                    name="address"
                                    value={this.state.values.address}
                                    onChange={this.inputChangeHandler}
                                    placeholder="delivery address"
                                    required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={this.state.values.city}
                                    placeholder="city"
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="postcode">Post Code</Label>
                                <Input
                                    type="text"
                                    name="postcode"
                                    id="postcode"
                                    value={this.state.values.postcode}
                                    placeholder="postcode"
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    type="text"
                                    name="country"
                                    id="country"
                                    value={this.state.values.country}
                                    placeholder="country"
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={this.state.values.phone}
                                    placeholder="phone"
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <select name="paymentType"
                                    value={this.state.values.paymentType}
                                    className="form-control"
                                    onChange={this.inputChangeHandler}>
                                    <option value="Cash On Delivery">Cash On Delivery</option>
                                    <option value="paynow">Pay Now</option>
                                </select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <div style={{ textAlign: "center" }}>
                        <Button style={{ backgroundColor: "#d70f64" }} disabled={this.props.purchaseable}>Place Order</Button>
                        {/* <Button style={{ backgroundColor: "grey" }} disabled={true}>Cancel Order</Button> */}
                    </div>
                </Form>
            </div>)
        return (
            <div>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalBody>
                        <p>{this.state.modalMessage}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/"><Button color="success" style={{ backgroundColor: "#d70864", color: "white", textDecoration: "none" }}>Return To Homepage</Button></Link>
                    </ModalFooter>

                </Modal>
                {this.state.redirectURL ? window.location = this.state.redirectURL : this.state.isLoading ? <Spinner /> : form}
                {/* {this.state.isLoading ? <Spinner /> : form} */}


            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);