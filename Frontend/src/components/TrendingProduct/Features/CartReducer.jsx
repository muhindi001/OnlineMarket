// CartReducer.jsx
const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      // Check if item already exists
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state; // prevent duplicates (optional)
      }
      return [...state, action.payload];

    case "Remove":
      return state.filter((item) => item.id !== action.id);

    case "Clear":
      return [];

    default:
      return state;
  }
};

export default CartReducer;
