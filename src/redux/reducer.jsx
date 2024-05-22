const initialState = {
  product: JSON.parse(localStorage.getItem("buy")) || [],
  expenses: JSON.parse(localStorage.getItem("expenses")) || 0,
  cash: JSON.parse(localStorage.getItem("cash")) || 20000,
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      localStorage.setItem(
        "buy",
        JSON.stringify([...state.product, action.payload])
      );
      return { ...state, product: [...state.product, action.payload] };
    case "BUY_PRODUCT":
      return {
        ...state,
        cash: state.cash - action.payload.price,
        expenses: state.expenses + +action.payload.price,
      };
    case "REMOVE_PRODUCT":
      localStorage.removeItem("buy");
      return { ...state, product: [], cash: 20000, expenses: 0 };
    default:
      return state;
  }
};
