import { createOrderEndpoint, productsDescriptionEndpoint, shippingMethodEndpoint } from '../constants/Endpoints';
import { shippingMethod } from '../constants/mocks/Shipping'
const axios = require('axios');

export const createOrderCB = (mappedOrder) => {
    axios.post(createOrderEndpoint, mappedOrder)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) return response.data
            else return false
        })
        .catch(function (error) {
            console.log(error);
            return false
        });
}

/** productsSku: String of skus comma separator. Eg: "122221,223442" */
export const getProductsCB = async (productsSku) => {

    try {
        const result = await axios.post(productsDescriptionEndpoint, { skus: productsSku })
        return result.data;
    }
    catch (error) {
        console.log(error);
        return false
    }
}

export const getShippingCB = () => {
    axios.post(shippingMethodEndpoint)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) return response.data
            else return false
        })
        .catch(function (error) {
            console.log(error);
            return false
        });
    return shippingMethod
}
