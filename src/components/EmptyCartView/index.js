import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty_cart_view_container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="empty_cart_image"
      alt="cart empty"
    />
    <h1 className="cart_empty_heading">Your Cart Is Empty</h1>

    <Link to="/products">
      <button type="button" className="shop_now_button">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
