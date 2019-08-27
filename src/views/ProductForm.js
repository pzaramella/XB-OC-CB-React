import ProductInputs from '../constants/input/Product.js'
import React, {Component} from 'react'
import Input from '../components/Input.js'
import Selector from '../components/Select.js'
import SelectWarehouse from '../components/SelectWarehouse.js'

class ProductForm extends Component {
  render() {
    const {inputGoodSn, inputGoodsNumber, inputWarehouse, inputShipping} = ProductInputs
    return (
      <div className="product">
        <Selector {...inputGoodSn} test={this.props.selectOnChangeProduct} />
        <Input {...inputGoodsNumber} test={this.props.test} />
      </div>
    )
  }
}

export default ProductForm
