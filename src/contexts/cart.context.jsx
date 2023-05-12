import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  //check if quantity is equal to 1, if it is remove the item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  //return cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
    { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CART_ACTION_TYPES = {
  "SET_IS_CART_OPEN": "SET_IS_CART_OPEN",
  "SET_CART_ITEMS": "SET_CART_ITEMS",
  "SET_CART_COUNT": "SET_CART_COUNT",
  "SET_CART_TOTAL": "SET_CART_TOTAL"
}

const cartReducer = (state, action) => {
  console.log("dispatched");
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
      break;
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      }
      break;
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload
      }
      break;
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: payload
      }
      break;
    default:
      throw new Error(`Unhandled type error ${type} in cartReducer`);
      break;
  }
}

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const [{ isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  console.log(isCartOpen);
  const setIsCartOpen = (cartItem) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: cartItem })
  }

  // const [cartItems, setCartItems] = useState([]);
  const [{ cartItems }, dispatch1] = useReducer(cartReducer, INITIAL_STATE)
  console.log("cart items = ", cartItems);
  const setCartItems = (cartItems) => {
    dispatch1({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems })
  }

  // const [cartCount, setCartCount] = useState(0);
  const [{ cartCount }, dispatch2] = useReducer(cartReducer, INITIAL_STATE);
  console.log("cart count = ", cartCount);
  const setCartCount = (cartCount) => {
    dispatch2({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload: cartCount })
  }

  // const [cartTotal, setCartTotal] = useState(0);
  const [{ cartTotal }, dispatch3] = useReducer(cartReducer, INITIAL_STATE)
  console.log("cart total = ", cartTotal);
  const setCartTotal = (cartTotal) => {
    dispatch3({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: cartTotal })
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}