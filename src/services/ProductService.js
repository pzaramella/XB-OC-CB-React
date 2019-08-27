import { getShippingCB } from '../servicesCB/OrderServiceCB'
import { createArraybyObject } from '../services/Utilities'

export let stringSkuProducts = (products) => {
    const skus = products.map((prod, index) => {
        return prod.good_sn
    })
    return skus.join()
}

export const getWarehousesByProduct = (productsCB, productsForm) => {
    return productsCB.map((product, i) => {
        const warehouseList = createArraybyObject(product.warehouse_list)
        const productForm = productsForm.find(value => {
            return value.good_sn.toString() === product.sku.toString()
        }
        )
        return { warehouseList, sku: product.sku, quantity: productForm.good_number }
    })
}

export const getWarehouseByProduct = (products) => {
    const seenWarehouses = {};

    products.forEach(product => {
        const prodQty = Number(product.quantity);
        const bestWh = product.warehouseList
            .reduce((wh, next) => {
                if (!wh) {
                    return next;
                } else {
                    const whGoods = Number(wh.goods_number);
                    const nextGoods = Number(next.goods_number);
                    if (!isNaN(nextGoods) && !isNaN(whGoods) &&
                        nextGoods >= prodQty && nextGoods > whGoods) {
                        return next;
                    }
                }
                return wh;
            });

        const bestWhStock = Number(bestWh.goods_number);
        if (bestWhStock >= prodQty) {
            if (seenWarehouses[bestWh.warehouse]) {
                const seenWarehouse = seenWarehouses[bestWh.warehouse]
                seenWarehouses[bestWh.warehouse] = {
                    ...seenWarehouse,
                    products: [...seenWarehouse.products, { goods_sn: product.sku, goods_number: product.quantity }]
                }
            } else {
                seenWarehouses[bestWh.warehouse] = {
                    name: bestWh.warehouse,
                    products: [{ goods_sn: product.sku, goods_number: product.quantity }]
                }
            }
        }
    });

    return Object.values(seenWarehouses);
}

export const getShippingMethod = async (warehouse) => {
    try {
        const shipping = await getShippingCB()
        if (shipping) {
            const result = shipping.reduce((result, current) => {
                const isAvailableWarehouse = result.available_warehouse.indexOf(warehouse) > -1
                const isAvailableWarehouseCurrent = current.available_warehouse.indexOf(warehouse) > -1
                const resultDispatchDays = isAvailableWarehouse ? result.ship_time.split('-') : false
                const currentDispatchDays = isAvailableWarehouseCurrent ? current.ship_time.split('-') : false

                if (!resultDispatchDays && currentDispatchDays) return current
                else if (resultDispatchDays && !currentDispatchDays) return result
                else if ((resultDispatchDays[0] < currentDispatchDays[0] || resultDispatchDays[1] < currentDispatchDays[1]))
                    return result
                else return current
            })
            return result.ship_code
        } else return false
    } catch (e) {
        throw new Error(e)
    }
}
