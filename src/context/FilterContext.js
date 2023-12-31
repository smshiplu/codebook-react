import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducers";

const filterInitialState = {
  productList: [],
  inStockOnly: false,
  bestSellerOnly: false,
  ratings: null,
  sortBy: null
}

const FilterContext = createContext(filterInitialState);
export const FilterProvider = ({children}) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  const initialProducts = (products) => {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products: products
      }
    })
  }

  const bestSeller = (products) => {
    return state.bestSellerOnly ? products.filter(product => product.best_seller === true) : products;
  }

  const inStock = (products) => {
    return state.inStockOnly ?  products.filter(product => product.in_stock === true) : products;
  }

  const sort = (products) => {
    if(state.sortBy === "lowtohigh") {
      return state.sortBy ?  products.sort((a, b) => Number(a.price) - Number(b.price)) : products;
    }
    if(state.sortBy === "hightolow") {
      return products.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return products;
  }

  const rating = (products) => {
    if(state.ratings === "4STARABOVE") {
      return products.filter(product => product.rating >= 4);
    }
    if(state.ratings === "3STARABOVE") {
      return products.filter(product => product.rating >= 3);
    }
    if(state.ratings === "2STARABOVE") {
      return products.filter(product => product.rating >= 2);
    }
    if(state.ratings === "1STARABOVE") {
      return products.filter(product => product.rating >= 1);
    }
    return products;
  }

  const filteredProductList = rating(sort(inStock(bestSeller(state.productList))));

  const value = {
    state,
    dispatch,
    productList: (state.bestSellerOnly || state.sortBy || state.ratings || state.inStockOnly) ? filteredProductList : state.productList.sort((a, b) => a.id - b.id),
    initialProducts
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext);
  return context;
}