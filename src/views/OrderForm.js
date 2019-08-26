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
import { getWarehousebyProduct } from '../services/ProductService'
import { skuList } from "../constants/mocks/SkuList";

function OrderForm() {
    const initProduct = { GoodSn: '', GoodsNumber: 0 };
    const warehouses = [];
    const [stateForm, setStateForm] = useState({})
    const [stateProducts, setStateProducts] = useState([initProduct])
    const [stateWarehouse, setStateWorehouse] = useState(warehouses)

    function saveOrder(event) {
        event.preventDefault()
        createOrder(stateForm, stateProducts)
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

    const selectOnChangeWarehouse = index => (value, event) => {
        console.log('Hola warehouses')
        setStateForm(prevState => {
            prevState[index] = { ...prevState[index], [value]: value }
            return prevState;
        })
    }

    const loadOptionsWarehouse = index => {
        console.log('estoy en loadOptionsWarehouse', index)
        //const warehouses = await getWarehousebyProduct(stateProducts[index].GoodSn)

        setStateWorehouse(prevState => {
            prevState[index] = { value: [{ label: 339656401, value: 339656401 }, { label: 452550401, value: 452550401 }] }
            return prevState;
        })
    }

    const selectOnChangeProduct = index => (value, event) => {
        console.log('Hola')
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
                    <ProductForm key={index} index={index}
                        test={productOnChange(index)}
                        selectOnChangeProduct={selectOnChangeProduct(index)}
                        selectOnChangeWarehouse={selectOnChangeWarehouse}
                        warehouses={stateWarehouse[index] && stateWarehouse[index].value} />
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