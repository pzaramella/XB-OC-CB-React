import { getProductsCB, getShippingCB } from '../servicesCB/OrderServiceCB'
import { createArraybyObject, sortObjectAsc } from '../services/Utilities'

let stringSkuProducts = (products) => {
    const skus = products.map((prod, index) => {
        return prod.goods_number
    })
    return skus.join()
}

export const avalaibleWarehouses = (warehouseList, quantity) => {
    return warehouseList.filter(warehouse => warehouse.goods_number >= quantity);
}

export const getWarehousesByProduct = (products) => {
    return products.map((product, i) => {
        const warehouseList = createArraybyObject(product.warehouse_list)
        return { warehouseList, sku: product.good_sn }
    })
}

export const getWarehouseByProduct = (products) => {
    const seenWarehouses = { mostSeen: {} };

    products.forEach(product => {
        product.warehouseList.forEach(warehouse => {
            if (seenWarehouses[warehouse]) {
                const seenWarehouse = seenWarehouses[warehouse]
                seenWarehouses[warehouse] = [...seenWarehouse, product.sku]
            } else {
                seenWarehouses[warehouse] = [product.sku]
            }
            const mostSeen = Object.values(seenWarehouses.mostSeen)[0]
            if (mostSeen && seenWarehouses[warehouse].length > mostSeen.length) {
                seenWarehouses.mostSeen = { [warehouse]: seenWarehouses[warehouse] }
            } else {
                seenWarehouses.mostSeen = { [warehouse]: seenWarehouses[warehouse] }
            }
        });
    });

    return seenWarehouses;
}

/** products: List the product from order. Object from view format: Sku and Quantity respectively
 * [{good_sn: '3243434', good_number: 2},{good_sn: '55446677', good_number: 20}] */

export const findShippingAndWarehouse = (products) => {
    const productsDescriptions = getProductsCB(stringSkuProducts(products))
    const shippingMethod = getShippingCB(stringSkuProducts(products))
    /*TODO: Validar que tenga todos los productos de la orden */
    /*TODO: Permanencia para el warehouse del primero en adelante para que entren en una misma orden */
    const productsWarehouses = getWarehousesByProduct(productsDescriptions)
    /** Loop products for merge the quantity selected with the response of warehouse array */
    productsWarehouses = productsWarehouses.map((productWarehouse) => {
        const result = products.find((product) => { return productWarehouse.sku === product.good_sn })
        productWarehouse.quantity = result.good_number
    })

    productsWarehouses = productsWarehouses.map((product) => {
        //Find warehouses with stock
        product.warehouseList = avalaibleWarehouses(product.warehouseList, product.good_number)
        product.warehouseList = sortObjectAsc(product.warehouseList, 'goods_sn')
    })

    getWarehouseByProduct(productsWarehouses)
}

export const getWarehousebyProduct = (async (productSku) => {
    const product = await getProductsCB(productSku)
    const warehouses = getWarehousesByProduct(product)
    return warehouses.map((value, index) => {
        return { label: value.warehouse + 'Stock: ' + value.goods_number, value: value.warehouse }
    })
})

