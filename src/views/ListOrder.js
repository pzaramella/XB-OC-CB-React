import React, {Fragment} from 'react'
import MaterialTable from 'material-table'
import {Divider} from '@material-ui/core'
import {withRouter} from 'react-router-dom'

function ListOrders(props) {
  console.log(props)
  const [state, setState] = React.useState({
    columns: [
      {title: 'Name', field: 'name'},
      {title: 'Surname', field: 'surname'},
      {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: {34: 'İstanbul', 63: 'Şanlıurfa'}
      }
    ],
    data: [
      {name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63},
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34
      }
    ]
  })

  function hola() {
    alert('Hola XD')
  }

  function renderRedirect(e) {
    //Condition for validate user y/o save cookie autentication
    props.history.push('/registro')
  }

  return (
    <Fragment>
      <div>
        <MaterialTable
          title="Listado de ordenes registradas"
          columns={state.columns}
          data={state.data}
        />
        <button onClick={renderRedirect}>Agregar nueva orden</button>
      </div>
    </Fragment>
  )
}

export default withRouter(ListOrders)
