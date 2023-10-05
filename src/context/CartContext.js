import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers";
const initialState = {
  cartList:[],
  total: 0
}

const CartContext = createContext(initialState);

export const CartProvider = ({children}) => {

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    const updatedCartList = state.cartList.concat(product);
    const updatedTotal = state.total + product.price;
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCartList,
        total: updatedTotal
      }
    });
  }

  const removeFromCart = (product) => {
    const updatedCartList = state.cartList.filter(current => current.id !== product.id);
    const updatedTotal = state.total - product.price;

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCartList,
        total: updatedTotal
      }
    });
  }

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
      payload: {
        products: [],
        total: 0
      }
    })
  }

  const value = {
    cartList: state.cartList,
    total: state.total,
    addToCart,
    removeFromCart,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
}