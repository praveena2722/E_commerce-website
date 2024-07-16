import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        deleteCartItem,
        decrementingCartItemQuantity,
        incrementingCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
      const onClickingDeleteCartItem = () => {
        deleteCartItem(id)
      }
      const onClickingDecrement = () => {
        decrementingCartItemQuantity(id)
      }
      const onClickingIncrement = () => {
        incrementingCartItemQuantity(id)
      }

      return (
        <li className="cart_item">
          <img className="cart_image" src={imageUrl} alt={title} />
          <div className="cart_item_details_container">
            <div className="cart_product_title_brand_container">
              <p className="cart_product_title">{title}</p>
              <p className="cart_product_brand">by {brand}</p>
            </div>
            <div className="cart_quantity_container">
              <button
                aria-label="Save"
                type="button"
                className="quantity_controller_button"
                data-testid="minus"
                onClick={onClickingDecrement}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart_quantity">{quantity}</p>
              <button
                aria-label="Save"
                type="button"
                className="quantity_controller_button"
                data-testid="plus"
                onClick={onClickingIncrement}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total_price_delete_container">
              <p className="cart_total_price">Rs {price * quantity}/-</p>
              <button
                className="remove_button"
                type="button"
                onClick={onClickingDeleteCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            aria-label="Save"
            className="delete_button"
            type="button"
            onClick={onClickingDeleteCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
