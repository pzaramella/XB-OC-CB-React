import ProductInputs from '../constants/input/product.js';
import React, { Component } from 'react'
import Input from '../components/Input.js';
import Selector from '../components/Select.js';
import SelectWarehouse from '../components/SelectWarehouse.js';

class ProductForm extends Component {
    render() {
        const { inputGoodSn, inputGoodsNumber, inputShipping } = ProductInputs
        return (
            <div className="product">
                <Selector className="product" {...inputGoodSn} test={this.props.selectOnChange} />
                <Input className="product" {...inputGoodsNumber} test={this.props.test} />
                <SelectWarehouse className="product" test={this.props.selectOnChange} loadOptions={this.props.loadOptions} />
            </div>
        )
    }
}

export default ProductForm
