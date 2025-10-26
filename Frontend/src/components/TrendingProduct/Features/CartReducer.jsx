// CartReducer.jsx
const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      // Check if item already exists
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If item exists, increase quantity
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // If item doesn't exist, add it with quantity 1
      return [...state, { ...action.payload, quantity: 1 }];

    case "Remove":
      return state.filter((item) => item.id !== action.id);

    case "IncreaseQuantity":
      return state.map(item =>
        item.id === action.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );

    case "DecreaseQuantity":
      return state.map(item =>
        item.id === action.id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case "Clear":
      return [];

    default:
      return state;
  }
};

export default CartReducer;
