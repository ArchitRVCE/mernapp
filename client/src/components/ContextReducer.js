import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size,img: action.img }]
        case 'REMOVE':
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr
        case 'DROP':
            let emptyArr = [];
            return emptyArr
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                //console.log(food.id,action.id)
                if (food.id === action.id) {
                    //console.log(food.name,food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                //return arr
            })
            return arr
        default:
            return "Error in context reducer";

    }
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
