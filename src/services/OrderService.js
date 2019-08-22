import React, { Component, Fragment, useState } from 'react'
import { createOrderEndpoint } from '../constants/endpoints';
import { mapper, orderMapList, productsMapList } from '../services/Utilities'
const axios = require('axios');

export const createOrder = (order, products) => {
    console.log('order', order)
    console.log('products: ', products)
    let mappedOrder = mapper(orderMapList, order)

    let mappedProducts = () => {
        const newProduct = []
        products.map((prod, index) => {
            newProduct.push(mapper(productsMapList, prod))
        })

        return newProduct
    }

    //console.log('mappedOrder: ', mappedOrder)
    const goods_info = mappedProducts();
    mappedOrder = Object.assign(mappedOrder, { goods_info })
    console.log('mappedOrder: ', mappedOrder)
    axios.post(createOrderEndpoint, mappedOrder)
        .then(function (response) {
            console.log(response);
            if (response.status == 200) return true
            else return false
        })
        .catch(function (error) {
            console.log(error);
            return false
        });
}
