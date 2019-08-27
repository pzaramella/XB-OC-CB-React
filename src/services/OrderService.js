import {createOrderCB, getProductsCB} from '../servicesCB/OrderServiceCB'
import {stringSkuProducts, getWarehousesByProduct, getWarehouseByProduct} from './ProductService'
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
      const order = []
      warehouses.map(warehouse => {
        mappedOrder.warehouse = warehouse.name
        mappedOrder.goods_info = warehouse.products
        mappedOrder.shipping_method = 'SEEUDYWPH'
        console.log('mappedOrder', mappedOrder)
        order.push(createOrderCB(mappedOrder))
      })
    } else alert('El/Los producto(s) seleccionados no tienen stock. No se puede crear la order.')
  } catch (error) {
    console.log('Main error:', error)
    alert('Ocurrio un error favor verifique los datos de la orden.')
  }

  return order
}
