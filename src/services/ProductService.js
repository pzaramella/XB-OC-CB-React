import { getProductsCB, getShippingCB } from '../servicesCB/OrderServiceCB'
import { createArraybyObject, sortObjectAsc } from '../services/Utilities'

export let stringSkuProducts = (products) => {
    const skus = products.map((prod, index) => {
        return prod.good_sn
    })
    return skus.join()
}

export const avalaibleWarehouses = (warehouseList, quantity) => {
    return warehouseList.filter(warehouse => warehouse.goods_number >= quantity);
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
    /*  const seenWarehouses = {};
 
     products.forEach(product => {
         product.warehouseList.forEach(warehouse => {
             const name = warehouse.warehouse
             if (seenWarehouses[name] && Number(warehouse.goods_number) >= Number(product.quantity)) {
                 const seenWarehouse = seenWarehouses[name]
                 seenWarehouses[name] = [...seenWarehouse, product.sku]
             } else if (Number(warehouse.goods_number) >= Number(product.quantity)) {
                 seenWarehouses[name] = [product.sku]
             }
         });
     });
     let list = []
 
     products.forEach(product => {
         let aux = { products: [] }
         let alreadyExist = false;
         product.warehouseList.forEach(warehouse => {
             const name = warehouse.warehouse
             console.log('Actual WS:', name)
             console.log('seenWarehouses ', seenWarehouses[name])
             console.log('aux ', aux)
             if (seenWarehouses[name] && seenWarehouses[name].length > aux['products'].length) {
                 console.log('list', console.log())
                 alreadyExist = list.find(value => {
                     return value.name === name && value.products.indexOf(product.sku) > -1
                         || value.products.indexOf(product.sku) > -1
                 })
 
                 if (!alreadyExist) {
                     aux = { 'name': name, products: seenWarehouses[name] }
                 } else {
                     aux = { products: [] }
                 }
             }
         })
 
         if (aux.products.length > 0)
             list.push(aux)
 
     })
     console.log('list', list)
     return list; */
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

