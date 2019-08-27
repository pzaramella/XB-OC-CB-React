import React, { Fragment, forwardRef, useEffect } from 'react'
import MaterialTable from 'material-table'
import { Divider } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  CollectionsBookmarkOutlined
} from '@material-ui/icons'

import ButtonContained from '../components/Button'
import { getListOrders } from '../services/OrderService'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

function ListOrders(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Order ODBMS', field: 'user_order_sn' },
      { title: 'Order CB', field: 'order_cb' },
      { title: 'Id Order', field: 'id', type: 'numeric' },
      { title: 'Nombre Cliente', field: 'firstname' },
      { title: 'Apellido Cliente', field: 'lastname' },
      { title: 'Teléfono', field: 'tel' },
      { title: 'Fecha registro', field: 'createdDate' }
    ],
    data: []
  })

  useEffect(() => {
    async function getListOrders() {
      const orders = await fetchOrders()
      setState({
        ...state,
        data: orders
      })
    }
    getListOrders()
  }, [])

  async function fetchOrders() {
    // try {
    const orders = await getListOrders()
    return orders.map(({ user_order_sn, order_cb, id, firstname, lastname, createdDate, tel }) => {
      return {
        user_order_sn,
        order_cb,
        id,
        firstname,
        lastname,
        tel,
        createdDate
      }
    })
  }

  function renderRedirect(e) {
    //Condition for validate user y/o save cookie autentication
    props.history.push('/registro')
  }

  console.log('Final data;', state)
  return (
    <Fragment>
      <MaterialTable
        options={{ search: true }}
        title="Listado de órdenes registradas"
        icons={tableIcons}
        columns={state.columns}
        data={state.data}
      />
      <ButtonContained onClick={renderRedirect} name="Agregar nueva orden" color="primary" />
    </Fragment>
  )
}

export default withRouter(ListOrders)
