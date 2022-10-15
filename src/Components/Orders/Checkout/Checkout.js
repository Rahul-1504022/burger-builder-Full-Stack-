import { Component } from "react";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner.js";
import { NavLink } from "react-router-dom";
import { resetIngredients } from "../../../redux/actionCreators"

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
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMessage: "",

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
            orderTime: new Date(),
            userId: this.props.userId,
        }
        axios.post('https://burger-builder-c88cc-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=' + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
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

    }

    render() {
        let form = (
            <div style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <h4 style={{ border: "1px solid grey", borderRadius: "8px", padding: "30px" }}>Payment:{this.props.totalPrice} BDT</h4>
                <form style={{ border: "1px solid white", borderRadius: "8px", padding: "30px" }} onSubmit={this.submitHandler}>
                    <textarea name="deliveryAddress"
                        value={this.state.values.deliveryAddress}
                        onChange={this.inputChangeHandler}
                        className="from-control"
                        placeholder="delivery address" />
                    <br />
                    <input type="text"
                        name="phone"
                        value={this.state.values.phone}
                        className="form-control"
                        onChange={this.inputChangeHandler}
                        placeholder="phone no." />
                    <br />
                    <select name="paymentType"
                        value={this.state.values.paymentType}
                        className="form-control"
                        onChange={this.inputChangeHandler}>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Bkash">Bkash</option>
                        <option value="Nagad">Nagad</option>
                    </select>
                    <br />
                    <div style={{ textAlign: "center" }}>
                        <Button style={{ backgroundColor: "#d70f64" }} disabled={this.props.purchaseable}>Place Order</Button>
                        {/* <Button style={{ backgroundColor: "grey" }} disabled={true}>Cancel Order</Button> */}
                    </div>
                </form>
            </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalBody>
                        <p>{this.state.modalMessage}</p>
                    </ModalBody>
                    <ModalFooter>
                        <button><NavLink to="/">Return To Homepage</NavLink></button>
                    </ModalFooter>

                </Modal>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);