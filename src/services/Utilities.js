export const orderMapList = {
    user_order_sn: 'OrderSn',
    country: 'Country',
    firstname: 'FirstName',
    lastname: 'LastName',
    addressline1: 'AddressLine1',
    addressline2: 'AddressLine2',
    tel: 'Tel',
    state: 'State',
    city: 'City',
    zip: 'Zip',
    order_remark: '',
    insure_fee: '',
    shipping_method: 'ShippingMethod',
    warehouse: 'Warehouse'
}

export const productsMapList = {
    good_sn: 'GoodSn',
    good_number: 'GoodsNumber'
}


export const mapper = (mapList, object, finder = (collection, key) => collection[key]) => (
    Object.keys(mapList).reduce((previous, localAttribute) =>
        ({ ...previous, ...{ [localAttribute]: finder(object, mapList[localAttribute]) } }), {})
);

export const createArraybyObject = (object) => {
    return Object.values(object)
}

export const sortObjectAsc = (items, property) => {
    items.sort(function (a, b) {
        if (a[property] > b[property]) {
            return -1;
        }
        if (a[property] < b[property]) {
            return 0;
        }
        // a must be equal to b
        return 1;
    });

    return items
}
