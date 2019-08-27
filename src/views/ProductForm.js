import ProductInputs from '../constants/input/Product.js'
import React, { Component } from 'react'
import Input from '../components/Input.js'
import Selector from '../components/Select.js'
import SelectWarehouse from '../components/SelectWarehouse.js'

class ProductForm extends Component {
  render() {
    const { inputGoodSn, inputGoodsNumber, inputWarehouse, inputShipping } = ProductInputs
    return (
      <div className="product display-flex">
        <div className="half-width">
          <Selector {...inputGoodSn} test={this.props.selectOnChangeProduct} />
        </div>
        <div className="half-width margin-goodnumber">
          <Input {...inputGoodsNumber} test={this.props.test} />
        </div>
      </div>
    )
  }
}

export default ProductForm
