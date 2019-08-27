import {
  createOrderCB,
  getProductsCB,
  getListOrdersCB,
  getTracking
} from '../servicesCB/OrderServiceCB'
import {
  stringSkuProducts,
  getWarehousesByProduct,
  getWarehouseByProduct,
  getShippingMethod
} from './ProductService'
import {mapper, orderMapList, productsMapList} from '../services/Utilities'

export const createOrder = async (order, products) => {
  try {
    console.log('order', order)
    console.log('products: ', products)
    let mappedOrder = mapper(orderMapList, order)
    /** mapped Product: good_number and good_sku */
    /* Innecesario renombrar campos de aqui en adelante */
    const goods_info = products.map(product => {
      return mapper(productsMapList, product)
    })
    /** build param: skus: string of products */
    const stringSkus = stringSkuProducts(goods_info)
    /** find product description - for extract warehouse */
    const productDesc = await getProductsCB(stringSkus)
    /** extract warehouse by product  */
    let warehouses = getWarehousesByProduct(productDesc, goods_info)
    console.log('warehouses ', warehouses)
    /** Select/divide same warehouse as posible */
    warehouses = getWarehouseByProduct(warehouses)
    console.log(warehouses)
    /** Map warehouse */
    if (warehouses.length > 0) {
      const order = warehouses.map(async warehouse => {
        try {
          mappedOrder.warehouse = warehouse.name
          mappedOrder.goods_info = warehouse.products
          mappedOrder.shipping_method = await getShippingMethod(warehouse.name)
          if (!mappedOrder.shipping_method) {
            throw new Error('Error al buscar el método de envío.')
          }
          console.log('mappedOrder', mappedOrder)
          const order = await createOrderCB(mappedOrder)
          console.log('order', order)
          return order
        } catch (e) {
          throw new Error(e)
        }
      })
      return order
    } else alert('El/Los producto(s) seleccionados no tienen stock. No se puede crear la order.')
  } catch (error) {
    alert('Ocurrio un error favor verifique los datos de la orden.' + error)
  }
}

export const getListOrders = async () => {
  // try {
  const result = await getListOrdersCB()
  return result
  // } catch (e) {
  //     throw new Error(e)
  // }
}

export const getTrackingList = async tracking => {
  return await getTracking(tracking)
}
