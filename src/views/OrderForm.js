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
} from '../constants/input/Order';
import ProductForm from './ProductForm';
import Input from '../components/Input';
import { createOrder } from '../services/OrderService'

function OrderForm() {
    const initProduct = { GoodSn: '', GoodNumber: 0 };
    const warehouses = [];
    const [stateForm, setStateForm] = useState({})
    const [stateProducts, setStateProducts] = useState([initProduct])

    function saveOrder(event) {
        event.preventDefault()
        /** order=[] */
        const order = createOrder(stateForm, stateProducts)
        /** TODO: save order */
        /** TODO: pay order */

    }

    function test(product, event) {
        const name = event.target.name
        setStateForm((prevState) => ({ ...prevState, [name]: product.value }))
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

    const selectOnChangeProduct = index => (value, event) => {
        console.log('Hola')
        const name = event.name
        setStateProducts(prevState => {
            prevState[index] = { ...prevState[index], [name]: value.value }
            return prevState;
        })
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
                    <ProductForm key={index} index={index}
                        test={productOnChange(index)}
                        selectOnChangeProduct={selectOnChangeProduct(index)} />
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