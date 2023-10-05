export const filterReducer = (state, action) => {

  const { type, payload } = action;

  switch(type) {
    case "PRODUCT_LIST":
      return {...state, productList: payload.products};
    
    case "SORT_BY":
      return {...state, sortBy: payload.sortBy};

    case "RATINGS":
      return {...state, ratings: payload.ratings};

    case "BEST_SELLER_ONLY":
      return {...state, bestSellerOnly: payload.bestSellerOnly};

    case "IN_STOCK_ONLY":
      return {...state, inStockOnly: payload.inStockOnly};

    case "CLEAR_FILTER":
      return {
        ...state,
        inStockOnly: false,
        bestSellerOnly: false,
        ratings: null,
        sortBy: null
      }

    default :
      throw new Error("No Case Found!");
  }
}
