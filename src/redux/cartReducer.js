const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    // 👉 ADD THIS HERE
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((_, i) => i !== action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;