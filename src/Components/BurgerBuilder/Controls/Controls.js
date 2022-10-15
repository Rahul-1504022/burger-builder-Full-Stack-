import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div style={{ fontWeight: "600", fontSize: "1.2rem", marginRight: "auto" }}>
                {props.label}
            </div>
            <button onClick={props.removed} className="btn btn-danger btn-sm m-1">-Less-</button>
            <button onClick={props.added} className="btn btn-success btn-sm m-1">+More+</button>
        </div>
    )
}

const Controls = props => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{ marginTop: "30px", marginBottom: "30px" }}>
                <CardHeader style={{ backgroundColor: "#d70864", color: "white" }}>
                    <h4>Add Ingredients</h4>
                </CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                added={() => props.ingredientAdded(item.type)}
                                removed={() => props.ingredientRemoved(item.type)}
                                key={Math.random()}
                            />
                        })
                    }

                </CardBody>
                <CardFooter>
                    <h5>Price : BDT <strong>{props.price}</strong></h5>
                </CardFooter>
                <Button disabled={props.purchaseable} onClick={props.toggleModal} style={{ backgroundColor: "#d70864", color: "white" }}>Order Now</Button>

            </Card>
        </div>
    );
}
export default Controls;