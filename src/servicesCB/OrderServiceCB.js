import {
  createOrderEndpoint,
  productsDescriptionEndpoint,
  shippingMethodEndpoint
} from '../constants/Endpoints'
import { shippingMethod } from '../constants/mocks/Shipping'
const axios = require('axios')

export const createOrderCB = async mappedOrder => {
  try {
    const result = await axios.post(createOrderEndpoint, { order: [mappedOrder] })
    return result;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/** productsSku: String of skus comma separator. Eg: "122221,223442" */
export const getProductsCB = async productsSku => {
  try {
    const result = await axios.post(productsDescriptionEndpoint, { skus: productsSku })
    return result.data
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getShippingCB = (async () => {
  try {
    const result = await axios
      .post(shippingMethodEndpoint)
    if (result.status === 200) return result.data
    else return false
  }
  catch (e) {
    console.log(e)
    return false
  }
})
