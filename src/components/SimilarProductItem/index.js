import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {imageUrl, title, brand, price, rating} = productDetails
  console.log('productDetails')
  console.log(productDetails)
  return (
    <li className="similar_product">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar_product_image"
      />

      <h1 className="similar_product_title">{title}</h1>
      <p className="similar_product_brand">by {brand}</p>
      <div className="similar_product_price_rating_container">
        <p className="similar_product_price">Rs {price}/-</p>
        <div className="similar_product_rating_container">
          <p className="similar_product_rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar_product_star_logo"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
