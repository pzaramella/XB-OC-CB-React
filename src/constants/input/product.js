import { skuList } from "../mocks/SkuList";
const ProductInputs = {
    inputGoodSn: {
        id: 'GoodSn',
        name: 'GoodSn',
        value: skuList,
        disabled: false,
        validate: false
    },
    inputGoodsNumber: {
        id: 'GoodsNumber',
        name: 'GoodsNumber',
        value: '',
        type: 'number',
        disabled: false,
        validate: false
    },
    inputWarehouse: {
        id: 'Warehouses',
        name: 'Warehouses',
        value: [],
        disabled: false,
        validate: false
    },
    inputShipping: {
        id: 'Shipping',
        name: 'Shipping',
        value: [],
        disabled: false,
        validate: false
    }
}

export default ProductInputs 