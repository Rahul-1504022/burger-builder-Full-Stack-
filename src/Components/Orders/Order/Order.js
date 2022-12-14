import React from "react";

const Order = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span key={item.type} style={{ boxShadow: "3px 3px grey", padding: "10px", margin: "10px", borderRadius: "8px" }}>
                {item.amount}X
                <span style={{ textTransform: "capitalize" }}>
                    {item.type}
                </span>
            </span>
        )
    })
    return (
        <div style={{ boxShadow: "3px 3px grey", padding: "10px", margin: "10px", borderRadius: "8px" }}>
            <h6>Customer Address : {props.order.customer.address}</h6>
            <p>Order Id : {props.order._id} </p>
            {props.order.customer.paymentType === "paid" ?
                <p>Payment Type : <span style={{ color: "green", fontWeight: "700" }}>Paid</span> </p> :
                <p>Payment Type : <span style={{ color: "red", fontWeight: "700" }}>{props.order.customer.paymentType}</span> </p>
            }

            <p>Contact : {props.order.customer.phone}</p>
            <hr />{ingredientSummary}<hr />
            <p><b>Total Price</b> : {props.order.totalPrice} BDT</p>

        </div>
    )
}

export default Order;