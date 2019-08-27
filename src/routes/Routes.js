import React from 'react';
import OrderForm from '../views/OrderForm'
import ListOrder from '../views/ListOrder'
import Login from '../views/Login'
import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css';

/* Routes */
/* Nav, autentification, error bundle */
function Routes() {

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <h3>Formulario de Ordenes de Compra - CB</h3>
                </header>
            </div>
            <Route path='/listado' component={ListOrder} />
            <Route path='/registro' component={OrderForm} />
            <Route path='/' render={props => <Login />}
            />
        </BrowserRouter>

    );
}

export default Routes;
