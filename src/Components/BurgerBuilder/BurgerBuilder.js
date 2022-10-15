import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Summary from "./Summary/Summary";
import { connect } from "react-redux";
import { addIngredient, removeIngredient, updatePurchaseAble } from "../../redux/actionCreators"

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchaseAble: () => dispatch(updatePurchaseAble())
    }
}

class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
    }


    addIngredientHandle = type => {
        this.props.addIngredient(type);
        this.props.updatePurchaseAble();
    }

    removeIngredientHandle = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchaseAble();
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckOut = () => {
        //console.log(this.props)
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="container d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchaseable={this.props.purchaseable} />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>
                        Your order summary
                    </ModalHeader>
                    <ModalBody>
                        <h5>Total Price : {this.props.totalPrice.toFixed(0)}</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleCheckOut} style={{ backgroundColor: "#d70864", color: "white" }}>Continue to Checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);