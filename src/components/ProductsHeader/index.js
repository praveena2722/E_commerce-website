import {BsFilterRight} from 'react-icons/bs'
import './index.css'

const ProductsHeader = props => {
  const {sortbyOptions, activeOptionId, changeSortby} = props
  const onChangeSortby = event => {
    changeSortby(event.target.value)
  }

  return (
    <div className="products_header">
      <h1 className="products_header_list_heading">All Products</h1>
      <div className="sort_by_container">
        <BsFilterRight className="sort_by_icon" />
        <h1 className="sort_by_heading">Sort by</h1>
        <select
          className="sort_by_select_element"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select_option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
