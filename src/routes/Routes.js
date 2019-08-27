import React from 'react'
import OrderForm from '../views/OrderForm'
import ListOrder from '../views/ListOrder'
import Login from '../views/Login'
import NavBar from '../components/NavBar'
import {BrowserRouter, Route} from 'react-router-dom'
import '../App.css'

/* Routes */
/* Nav, autentification, error bundle */
function Routes() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar name="Formulario ordenes de compras" />
      </div>
      <Route exact path="/" render={props => <Login />} />
      <Route exact path="/login" component={Login} />
      <Route path="/listado" component={ListOrder} />
      <Route path="/registro" component={OrderForm} />
    </BrowserRouter>
  )
}

export default Routes
