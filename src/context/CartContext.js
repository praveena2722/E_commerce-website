import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addingItemToCart: () => {},
  deleteCartItem: () => {},
  removeAllCartItems: () => {},
  decrementingCartItemQuantity: () => {},
  incrementingCartItemQuantity: () => {},
  renderCartItemsCount: () => {},
})

export default CartContext
