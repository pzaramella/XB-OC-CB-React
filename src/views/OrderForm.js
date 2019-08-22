import React, { Component, Fragment, useState } from 'react'
import {
    inputOrdenSn,
    inputCountry,
    inputFirstName,
    inputLastName,
    inputAddressLine1,
    inputAddressLine2,
    inputTel,
    inputState,
    inputCity,
    inputZip
} from '../constants/input/order.js';
import ProductForm from './ProductForm.js';
import Input from '../components/Input.js';
import { createOrder } from '../services/OrderService'


function OrderForm() {
    const initProduct = { GoodSn: '', GoodsNumber: 0 };
    const [stateForm, setStateForm] = useState({})
    const [stateProducts, setStateProducts] = useState([initProduct])
    const products = []

    function saveOrder(event) {
        event.preventDefault()
        createOrder(stateForm, stateProducts)
    }

    function test(value, event) {
        const name = event.target.name
        setStateForm((prevState) => ({ ...prevState, [name]: value }))
    }

    function addProduct(e) {
        setStateProducts((prevState) => ([...prevState, initProduct]))
    }

    const productOnChange = index => (value, event) => {
        const name = event.target.name
        console.log(event.target)

        setStateProducts(prevState => {
            prevState[index] = { ...prevState[index], [name]: value }
            return prevState;
        })
    }

    return (
        <Fragment>
            <form onSubmit={saveOrder}>
                <h2>Datos de contacto</h2>
                <Input {...inputOrdenSn} test={test} />
                <Input {...inputFirstName} test={test} />
                <Input {...inputLastName} test={test} />
                <Input {...inputTel} test={test} />
                <h2>Datos de la dirección de despacho</h2>
                <Input {...inputAddressLine1} test={test} />
                <Input {...inputAddressLine2} test={test} />
                <Input {...inputCountry} test={test} />
                <Input {...inputCity} test={test} />
                <Input {...inputState} test={test} />
                <Input {...inputZip} test={test} />
                <h2>Datos de los productos</h2>
                {stateProducts.map((product, index) =>
                    <ProductForm key={index} index={index} test={productOnChange(index)} />
                )}
                <button type="button" onClick={addProduct}>Agregar producto</button>
                <button type="submit">Guardar</button>
            </form>
        </Fragment>

    );
}

/*
inputOrdenSn,
    inputCountry,
    inputFirstName,
    inputLastName,
    inputAddressLine1,
    inputAddressLine2,
    inputTel,
    inputState,
    inputCity,
    inputZip */

export default OrderForm;