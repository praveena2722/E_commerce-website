import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ProductItemDetails from './components/ProductItemDetails'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementingCartItemQuantity = id => {
    const {cartList} = this.state
    const gettingProductObject = cartList.find(
      eachCartProduct => eachCartProduct.id === id,
    )
    if (gettingProductObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartProduct => {
          if (id === eachCartProduct.id) {
            const updatedQuantity = eachCartProduct.quantity - 1
            return {...eachCartProduct, quantity: updatedQuantity}
          }
          return eachCartProduct
        }),
      }))
    } else {
      this.deleteCartItem(id)
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartProduct => eachCartProduct.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  incrementingCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartProduct => {
        if (eachCartProduct.id === id) {
          const updatedQuantity = eachCartProduct.quantity + 1
          return {...eachCartProduct, quantity: updatedQuantity}
        }
        return eachCartProduct
      }),
    }))
  }

  addingItemToCart = product => {
    const {cartList} = this.state
    const gettingProductObject = cartList.find(
      eachCartProduct => eachCartProduct.id === product.id,
    )
    if (gettingProductObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartProduct => {
          if (gettingProductObject.id === eachCartProduct.id) {
            const updatedQuantity = eachCartProduct.quantity + product.quantity
            return {...eachCartProduct, quantity: updatedQuantity}
          }
          return eachCartProduct
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addingItemToCart: this.addingItemToCart,
          deleteCartItem: this.deleteCartItem,
          decrementingCartItemQuantity: this.decrementingCartItemQuantity,
          incrementingCartItemQuantity: this.incrementingCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
