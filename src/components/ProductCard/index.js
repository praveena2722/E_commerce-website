import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {productDetails} = props
  const {title, brand, imageUrl, rating, price, id} = productDetails

  return (
    <li className="product_details_container">
      <Link to={`/products/${id}`} className="link_item">
        <img src={imageUrl} alt="product" className="thumbnail_img" />
        <h1 className="title">{title}</h1>
        <p className="product_brand">by {brand}</p>
        <div className="product_details">
          <p className="price_product_card">Rs {price}/-</p>
          <div className="rating_container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </Link>
    </li>
  )
}
export default ProductCard
