import React, { Component, Fragment, useState } from 'react'
import {inputOrdenSn,
    inputCountry,
    inputFirstName,
    inputLastName,
    inputAddressLine1,
    inputAddressLine2,
    inputTel,
    inputState,
    inputCity,
    inputZip} from '../constants/input/order.js';
import ProductForm from './ProductForm.js';
// import Input from '../components/Input.js';
import Input from '../components/Input.js'


function OrderForm() {
    const initialValues = {
        zip: '',
        state: '',
        city: ''
    }
    const [stateForm, setStateForm] = useState( {
        zip: '',
        state: '',
        city: ''
    })

    function saveOrder(event) {
        event.preventDefault()
        console.log('event: ', stateForm)
    }

    function test(value,event) {
        const name = event.target.name
        console.log('value: ',value)
        console.log('event: ',event.target.name)

        setStateForm({...stateForm,[name]:value})
    }
    // function test_v2(value,event) {
    //     console.log('value: ',value)
    //     console.log('event: ',event)
    //     // setStateForm({
    //     //     ...stateForm,
    //     //     [name]: value
    //     // })
    // }
    return (
        <Fragment>
            <form onSubmit={saveOrder}>
                <h2>Datos de contacto</h2>
                {/* <Input {...inputOrdenSn} test={test} />
                <Input {...inputFirstName} test={test} />
                <Input {...inputLastName} test={test} />
                <Input {...inputTel} test={test} />
                <h2>Datos de la dirección de despacho</h2>
                <Input {...inputAddressLine1} test={test} />
                <Input {...inputAddressLine2} test={test} />
                <Input {...inputCountry} test={test} /> */}
                <Input {...inputCity} test={test} />
                <Input {...inputState} test={test} />
                <Input {...inputZip} test={test} />
                <h2>Datos de los productos</h2>
                <ProductForm />
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