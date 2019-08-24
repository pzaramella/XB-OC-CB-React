import { createOrderCB } from '../servicesCB/OrderServiceCB'
import { mapper, orderMapList, productsMapList } from '../services/Utilities'

export const createOrder = (order, products) => {
    console.log('order', order)
    console.log('products: ', products)
    let mappedOrder = mapper(orderMapList, order)

    let mappedProducts = () => {
        return products.map((prod, index) => {
            return mapper(productsMapList, prod)
        })
    }

    const goods_info = mappedProducts();
    mappedOrder = Object.assign(mappedOrder, { goods_info })



    createOrderCB(mappedOrder)
}



