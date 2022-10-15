import React from "react";
import Ingredient from "../Ingredient/Ingredients";
import './Burger.css';

const Burger = (props) => {
    let ingredientsArray = props.ingredients.map(item => {
        let amountArray = [...Array(item.amount).keys()]
        return amountArray.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element);
        }, []);
    if (ingredientsArray.length === 0) {
        ingredientsArray = <p>Please add some ingredients</p>
    }
    return (
        <div className="Burger">
            <Ingredient type="bread-top" />
            {ingredientsArray}
            <Ingredient type="bread-bottom" />
        </div>
    )
}
export default Burger;