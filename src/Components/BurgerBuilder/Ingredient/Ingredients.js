import React from "react";
import BreadTop from "../../../assets/images/top.png";
import BreadBottom from "../../../assets/images/bottom.png";
import Cheese from "../../../assets/images/cheese.png";
import Meat from "../../../assets/images/meat.png";
import Salad from "../../../assets/images/salad.png";
import './ingredients.css';

const Ingredient = (props) => {
    let ingredient = null;
    switch (props.type) {
        case 'bread-bottom':
            ingredient = <div><img src={BreadBottom} /></div>
            break;
        case 'bread-top':
            ingredient = <div><img src={BreadTop} /></div>
            break;
        case 'meat':
            ingredient = <div><img src={Meat} /></div>
            break;
        case 'cheese':
            ingredient = <div><img src={Cheese} /></div>
            break;
        case 'salad':
            ingredient = <div><img src={Salad} /></div>
            break;
        default:
            ingredient = null;
    }
    return (
        <div className="Ingredients">
            {ingredient}

        </div>
    )
}
export default Ingredient;
