import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators"
import Order from "./Order/Order";
import Spinner from "../Spinner/Spinner";

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    componentDidUpdate() {
    }
    render() {

        let orders = null;
        if (this.props.orderErr) {
            orders = <p style={{ boxShadow: "3px 3px grey", padding: "10px", margin: "10px", borderRadius: "8px" }}>Sorry Failed to Load Orders</p>
        }
        else {
            if (this.props.orders.length === 0) {
                orders = <p style={{ boxShadow: "3px 3px grey", padding: "10px", margin: "10px", borderRadius: "8px" }}>You have no orders till now</p>
            } else {
                orders = this.props.orders.map(order => {
                    return (<Order
                        key={order.id}
                        order={order}
                    />)
                })
            }

        }
        orders = this.props.orders.map(order => {
            return (<Order
                key={order.id}
                order={order}
            />)
        })

        return (
            <div>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);