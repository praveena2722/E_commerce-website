import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const onClickingLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart_count_display">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )
  return (
    <nav className="header_container">
      <div className="header_view">
        <div className="logo_container_sm">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
              className="website_logo_sm"
            />
          </Link>

          <button
            type="button"
            className="logout_btn_mobile_view"
            onClick={onClickingLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="logout_logo_sm"
            />
          </button>
        </div>
        <div className="options_container_lg">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
              className="website_logo_lg"
            />
          </Link>
          <ul className="options_list_lg">
            <li className="option_item_lg">
              <Link to="/" className="nav_link">
                Home
              </Link>
            </li>
            <li className="option_item_lg">
              <Link to="/products" className="nav_link">
                Products
              </Link>
            </li>
            <li className="option_item_lg">
              <Link to="/cart" className="nav_link">
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="logout_btn_desktop_view"
            onClick={onClickingLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="options_container_sm">
        <ul className="options_list_sm">
          <li className="option_item_sm">
            <Link to="/" className="nav_link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="home_logo"
              />
            </Link>
          </li>
          <li className="option_item_sm">
            <Link to="/products" className="nav_link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="product_logo"
              />
            </Link>
          </li>
          <li className="option_item_sm">
            <Link to="/cart" className="nav_link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="cart_logo"
              />
              {renderCartItemsCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
