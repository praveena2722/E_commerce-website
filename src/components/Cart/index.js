import CartContext from '../../context/CartContext'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const onClickingRemoveAllButton = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          <div className="cart_container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart_content_container">
                <h1 className="cart_heading">My Cart</h1>
                <button
                  type="button"
                  className="remove_all_button"
                  onClick={onClickingRemoveAllButton}
                >
                  {' '}
                  Remove All{' '}
                </button>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
