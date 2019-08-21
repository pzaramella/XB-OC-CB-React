import ProductInputs from '../constants/input/product.js';
import React, { Component, Fragment } from 'react'
import Input from '../components/Input.js';

class ProductForm extends Component {
    render() {
        const { inputGoodSn, inputGoodsNumber } = ProductInputs
        return (<Fragment>
            <div>
                <Input {...inputGoodSn} />
                <Input {...inputGoodsNumber} />
            </div>
        </Fragment>)
    }
}

export default ProductForm
