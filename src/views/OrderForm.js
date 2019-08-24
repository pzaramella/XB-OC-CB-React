import React, { Fragment, useState } from 'react'
import '../css/OrderForm.css'
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
import { getWarehousebyProduct } from '../services/ProductService'



function OrderForm() {
    const initProduct = { GoodSn: '', GoodsNumber: 0 };
    const [stateForm, setStateForm] = useState({})
    const [stateProducts, setStateProducts] = useState([initProduct])
    const [stateWarehouse, setStateWorehouse] = useState({})

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

    const loadOptionsWarehouse = index => async (value, event) => {
        const warehouses = await getWarehousebyProduct(stateProducts[index].name)
        setStateWorehouse(prevState => {
            prevState[index] = { [value]: warehouses }
            return prevState;
        })
    }

    const selectOnChange = index => (value, event) => {
        console.log(event.target)
        setStateProducts(prevState => {
            prevState[index] = { ...prevState[index], [value]: value }
            return prevState;
        })
        loadOptionsWarehouse(index)
    }

    return (
        <Fragment>
            <form className="orderForm" onSubmit={saveOrder}>
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
                <div><h2>Datos de los productos</h2> <button type="button" className="button" onClick={addProduct}>Agregar producto</button>
                </div>
                {stateProducts.map((product, index) =>
                    <ProductForm key={index} index={index} test={productOnChange(index)} selectOnChange={selectOnChange(index)} loadOptionsWarehouse={loadOptionsWarehouse} />
                )}

                <button type="submit" className="button">Guardar</button>
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