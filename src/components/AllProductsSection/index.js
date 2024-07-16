import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import FiltersGroup from '../FiltersGroup'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    searchInput: '',
    activeRatingId: '',
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeOptionId,
      activeCategoryId,
      searchInput,
      activeRatingId,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedData = fetchedData.products.map(eachProduct => ({
        title: eachProduct.title,
        brand: eachProduct.brand,
        price: eachProduct.price,
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        rating: eachProduct.rating,
      }))
      // console.log(updatedData)
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.getProducts)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getProducts)
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderProductsView = () => {
    const {productsList, activeOptionId} = this.state
    const productListLength = productsList.length > 0

    return productListLength ? (
      <div className="all_products_container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products_list">
          {productsList.map(product => (
            <ProductCard productDetails={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no_products_view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no_products_img"
          alt="no products"
        />
        <h1 className="no_products_heading">No Products Found</h1>
        <p className="no_products_description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products_loader_container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products_error_view_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products_failure_img"
      />
      <h1 className="product_failure_heading_text">
        Oops! Something Went Wrong
      </h1>
      <p className="products_failure_description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsList = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeCategoryId: '',
        activeRatingId: '',
      },
      this.getProducts,
    )
  }

  render() {
    const {activeCategoryId, searchInput, activeRatingId} = this.state
    return (
      <div className="all_products_section_container">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilters={this.clearFilters}
        />
        {this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
