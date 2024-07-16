import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartProduct => {
        total += eachCartProduct.price * eachCartProduct.quantity
      })
      const cartItemCount = cartList.length
      const cartItemText = cartItemCount === 1 ? `Item` : `Items`

      return (
        <>
          <div className="cart_summary_container">
            <h1 className="order_total_value">
              <span className="order_total_label">Order Total: </span>
              Rs {total}/-
            </h1>
            <p className="total_products">
              {cartItemCount} {cartItemText} in cart
            </p>
            <button type="button" className="checkout_button d-sm-none">
              Checkout
            </button>
          </div>
          <button type="button" className="checkout_button d-lg-none">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
