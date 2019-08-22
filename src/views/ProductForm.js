import ProductInputs from '../constants/input/product.js';
import React, { Component, Fragment } from 'react'
import Input from '../components/Input.js';

class ProductForm extends Component {
    render() {
        const { inputGoodSn, inputGoodsNumber } = ProductInputs
        return (
            <div>
                <Input {...inputGoodSn} test={this.props.test} />
                <Input {...inputGoodsNumber} test={this.props.test} />
            </div>
        )
    }
}

export default ProductForm
