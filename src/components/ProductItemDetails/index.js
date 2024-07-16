import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import CartContext from '../../context/CartContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    productsList: {},
    similarProductsData: [],
    quantity: 1,
  }

  componentDidMount = () => {
    this.getData()
  }

  getUpdatedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    title: data.title,
    price: data.price,
    description: data.description,
    availability: data.availability,
    brand: data.brand,
    rating: data.rating,
    totalReviews: data.total_reviews,
  })

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log('RESPONSE')
      console.log(response)
      // console.log('FETCHED DATA')
      console.log(fetchedData)
      const updatedProductList = this.getUpdatedData(fetchedData)
      const updatedSimilarProducts = fetchedData.similar_products.map(
        eachSimilarProduct => this.getUpdatedData(eachSimilarProduct),
      )
      // console.log('UPDATED PRODUCT LIST')
      console.log(updatedProductList)

      this.setState({
        productsList: updatedProductList,
        similarProductsData: updatedSimilarProducts,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onSuccessView = () => (
    <CartContext.Consumer>
      {value => {
        const {productsList, quantity, similarProductsData} = this.state
        const {
          imageUrl,
          title,
          price,
          description,
          availability,
          brand,
          rating,
          totalReviews,
        } = productsList
        const {addingItemToCart} = value
        const onClickAddToCart = () => {
          addingItemToCart({...productsList, quantity})
        }
        return (
          <div className="product_details_success_view_container">
            <div className="product_item_details_container">
              <img src={imageUrl} alt="product" className="product_image" />
              <div className="details_container_view">
                <h1 className="title_product">{title}</h1>
                <div className="rating_review_container">
                  <div className="rating_container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star_logo"
                    />
                  </div>
                  <p className="total_reviews">{totalReviews} Reviews</p>
                </div>
                <p className="price">Rs {price} /-</p>
                <p className="product_description">{description}</p>

                <p className="available">
                  Available:
                  <span className="status">{availability}</span>
                </p>
                <p className="brand">
                  Brand:
                  <span className="status">{brand}</span>
                </p>
                <hr className="horizontal_line" />
                <div className="icon_container">
                  <button
                    type="button"
                    className="quantity_button"
                    aria-label="Save"
                    data-testid="minus"
                    onClick={this.onDecrement}
                  >
                    <BsDashSquare className="quantityDecrementIcon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity_button"
                    aria-label="Save"
                    data-testid="plus"
                    onClick={this.onIncrement}
                  >
                    <BsPlusSquare className="quantityIncrementIcon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="btn_prop add_to_cart_button"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1 className="similar_products_heading">Similar Products</h1>
            <ul className="similar_products_list_container">
              {similarProductsData.map(eachSimilarProduct => (
                <SimilarProductItem
                  key={eachSimilarProduct.id}
                  productDetails={eachSimilarProduct}
                />
              ))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  onFailureView = () => (
    <div className="failure_view_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failure_view_image"
      />
      <h1 className="product_not_found_heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="btn_prop">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  loadingView = () => (
    <div className="products_details_loader_container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onSuccessView()
      case apiStatusConstants.failure:
        return this.onFailureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="result_container">
          {this.renderProductDetailsView()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
